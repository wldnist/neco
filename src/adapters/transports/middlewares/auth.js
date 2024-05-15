import jwt from "jsonwebtoken";
import {
  DataNotFoundError,
  EmptyTokenError,
  InactiveAccountError,
  IncompleteDataError,
  NoTokenProvidedError,
  TokenHasExpiredError,
  TokenRejectedError,
  UnauthenticatedError,
  UnverifiedAccountError,
} from "../../../core/ports/error.js";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenOptions = { expiresIn: process.env.ACCESS_TOKEN_EXPIRY };
const refreshTokenOptions = { expiresIn: process.env.REFRESH_TOKEN_EXPIRY };

class Auth {
  static async authenticate(req, res, next) {
    try {
      req.user = await Auth.authenticateProcess(req);
      next();
    } catch (error) {
      next(error);
    }
  }

  static async authenticateProcess(req) {
    try {
      const headerAuth = req.headers.authorization;
      if (headerAuth == undefined) {
        throw NoTokenProvidedError;
      }

      const token = headerAuth.split(" ")[1];
      if (!token) {
        throw NoTokenProvidedError;
      }

      const isTokenBlackListed = await req.dependencies.inMemoryRepository.get({
        key: `blacklist_token_${token}`,
      });

      if (isTokenBlackListed) {
        throw TokenRejectedError;
      }

      const decoded = jwt.verify(token, accessTokenSecret);
      if (!decoded) {
        throw EmptyTokenError;
      }

      const { uuid = "" } = decoded;
      const userData = await req.dependencies.userRepository.getByUUID(uuid);
      if (!userData) {
        throw UnauthenticatedError;
      }

      const userSPMatrixData =
        await req.dependencies.userSPMatrixRepository.getByUserUUID(uuid);
      if (!userSPMatrixData) {
        throw IncompleteDataError;
      }

      userSPMatrixData.branches = JSON.parse(userSPMatrixData.branches);
      userSPMatrixData.principals = JSON.parse(userSPMatrixData.principals);
      decoded.user_sp_matrix = userSPMatrixData;

      return decoded;
    } catch (error) {
      if (
        error.message === "jwt expired" ||
        error instanceof jwt.TokenExpiredError
      ) {
        throw TokenHasExpiredError;
      } else {
        throw error;
      }
    }
  }

  static generateToken(payload, type) {
    let secretKey, options;
    switch (type) {
      case "TOKEN":
        secretKey = accessTokenSecret;
        options = accessTokenOptions;
        break;
      case "REFRESH_TOKEN":
        secretKey = refreshTokenSecret;
        options = refreshTokenOptions;
        break;
      default:
        secretKey = "";
        options = "";
        break;
    }

    return jwt.sign(payload, secretKey, options);
  }

  static generateTokenWithExp(payload, type) {
    let secretKey, options;
    switch (type) {
      case "TOKEN":
        secretKey = accessTokenSecret;
        options = accessTokenOptions;
        break;
      case "REFRESH_TOKEN":
        secretKey = refreshTokenSecret;
        options = refreshTokenOptions;
        break;
      default:
        secretKey = "";
        options = "";
        break;
    }

    const token = jwt.sign(payload, secretKey, options);
    const { exp } = jwt.verify(token, secretKey);
    return { token, exp };
  }

  static async verifyToken({ inMemoryRepository, token, tokenSecret }) {
    if (!token) {
      throw NoTokenProvidedError;
    }

    const isTokenBlackListed = await inMemoryRepository.get(
      `blacklist_token_${token}`,
    );
    if (isTokenBlackListed) {
      throw TokenRejectedError;
    }

    const result = jwt.verify(token, tokenSecret);
    if (!result) {
      throw DataNotFoundError;
    }

    return result;
  }

  static async decodeToken({ inMemoryRepository, token, type }) {
    let tokenSecret = accessTokenSecret;
    if (type == "REFRESH_TOKEN") {
      tokenSecret = refreshTokenSecret;
    }

    const decodedData = await this.verifyToken({
      inMemoryRepository,
      token,
      tokenSecret,
    });

    if (!decodedData) {
      throw DataNotFoundError;
    }

    return decodedData;
  }

  static async generateNewToken(dependencies) {
    const refreshToken = dependencies.refreshToken;
    const verifyTokenDependencies = {
      redisClient: dependencies.redisClient,
      token: refreshToken,
      tokenSecret: refreshTokenSecret,
    };

    const decodedData = await this.verifyToken(verifyTokenDependencies);
    if (!decodedData) {
      throw DataNotFoundError;
    }

    const generateTokenPayload = this.#getGenerateTokenPayload(
      dependencies.module,
      decodedData,
    );

    const newToken = this.generateToken(generateTokenPayload, "TOKEN");
    const newRefreshToken = this.generateToken(
      generateTokenPayload,
      "REFRESH_TOKEN",
    );

    await dependencies.redisClient.set(
      `blacklist_token_${refreshToken}`,
      refreshToken,
    );

    return {
      token: newToken,
      refresh_token: newRefreshToken,
    };
  }

  static #getGenerateTokenPayload(module, data) {
    let generateNewTokenPayload;
    switch (module) {
      case "ADMIN":
        generateNewTokenPayload = {
          email: data.email,
        };
        break;
      case "USER":
        generateNewTokenPayload = {
          user_id: data.user_id,
          email: data.email,
          user_sp_matrix: data.user_sp_matrix,
          user_menu_matrix: data.user_menu_matrix,
        };
        break;
      default:
        generateNewTokenPayload = {};
        break;
    }

    return generateNewTokenPayload;
  }
}

export default Auth;
