import {
  DataNotFoundError,
  DuplicateDataError,
  RequiredFieldsError,
  UnauthenticatedError,
} from "../ports/error.js";
import UserServiceAbstract from "../ports/serviceUser.js";
import {
  generateUniqueUUID,
  hashData,
  provideUserInfo,
} from "../utils/util.js";
import { constructCompleteUserInfo } from "./helper.js";

class UserService extends UserServiceAbstract {
  constructor({
    transactionHelper,
    userRepository,
    inMemoryRepository,
    auth,
  }) {
    super();

    this.transactionHelper = transactionHelper;
    this.repository = userRepository;
    this.inMemoryRepository = inMemoryRepository;
    this.auth = auth;
  }

  async get(id) {
    return await this.#getUser({
      method: "get",
      params: id,
    });
  }

  async getByUUID(uuid) {
    return await this.#getUser({
      method: "getByUUID",
      params: uuid,
    });
  }

  async getByEmail(email) {
    return await this.#getUser({
      method: "getByEmail",
      params: email,
    });
  }

  async list(data) {
    return await this.#getUserList({
      method: "list",
      params: data,
    });
  }

  async getByIds(ids) {
    return await this.#getUserList({
      method: "getByIds",
      params: ids,
    });
  }

  async getByUUIDs(uuids) {
    return await this.#getUserList({
      method: "getByUUIDs",
      params: uuids,
    });
  }

  async orchestrateCreateUser({
    userData,
    spMatrixData,
    menuMatrixData,
    sessionUser,
  }) {
    const {
      userEmail,
      userName,
      userPhone,
      userDOB,
      userStatus,
      userPassword,
    } = userData;
    const {
      spMatrixCompanyCode,
      spMatrixRoleId,
      spMatrixBranches,
      spMatrixPrincipals,
      spMatrixStatus,
    } = spMatrixData;
    const existingData = await this.repository.getByEmail(userEmail);
    if (existingData) throw DuplicateDataError;
    if (!userPassword) throw RequiredFieldsError({ field: "password" });
    const hashedPassword = hashData({ data: userPassword });
    const generatedUUID = await generateUniqueUUID({
      repository: this.repository,
    });

    let transaction;
    try {
      transaction = await this.transactionHelper.beginTransaction();
      await this.repository.createWithTransaction({
        data: {
          uuid: generatedUUID,
          email: userEmail,
          name: userName,
          phone: userPhone,
          dob: userDOB,
          status: userStatus,
          password: hashedPassword,
          verified: false,
          created_by: sessionUser,
        },
        transaction,
      });

      await this.userSPMatrixRepository.createWithTransaction({
        data: {
          user_uuid: generatedUUID,
          company_code: spMatrixCompanyCode,
          role_id: spMatrixRoleId,
          branches: spMatrixBranches,
          principals: spMatrixPrincipals,
          status: spMatrixStatus,
          created_by: sessionUser,
        },
        transaction,
      });

      const restructuredMenuMatrixData = menuMatrixData.map((obj) => ({
        ...obj,
        user_uuid: generatedUUID,
        created_by: sessionUser,
      }));
      await this.userMenuMatrixRepository.createWithTransaction({
        data: restructuredMenuMatrixData,
        transaction,
      });

      await this.transactionHelper.commitTransaction(transaction);
    } catch (error) {
      await this.transactionHelper.rollbackTransaction(transaction);
      throw error;
    }
  }

  async create({ userData, sessionUser }) {
    const {
      userEmail,
      userName,
      userPhone,
      userDOB,
      userStatus,
      userPassword,
    } = userData;
    const existingData = await this.repository.getByEmail(userEmail);
    if (existingData) throw DuplicateDataError;
    if (!userPassword) throw RequiredFieldsError({ field: "password" });
    const hashedPassword = hashData({ data: userPassword });
    const generatedUUID = await generateUniqueUUID({
      repository: this.repository,
    });

    await this.repository.create({
      uuid: generatedUUID,
      email: userEmail,
      name: userName,
      phone: userPhone,
      dob: userDOB,
      status: userStatus,
      password: hashedPassword,
      verified: false,
      created_by: sessionUser,
    });
  }

  async orchestrateUpdateUser({
    userData,
    spMatrixData,
    menuMatrixData,
    sessionUser,
  }) {
    const {
      userId,
      userUUID,
      userEmail,
      userName,
      userPhone,
      userDOB,
      userStatus,
      userPassword,
    } = userData;
    const existingUserData = await this.repository.getByUUID(userUUID);
    if (!existingUserData) throw DataNotFoundError;

    const {
      spMatrixUserUUID,
      spMatrixId,
      spMatrixCompanyCode,
      spMatrixRoleId,
      spMatrixBranches,
      spMatrixPrincipals,
      spMatrixStatus,
    } = spMatrixData;
    const existingSpMatrixData =
      await this.userSPMatrixRepository.get(spMatrixId);
    if (!existingSpMatrixData) throw DataNotFoundError;

    /** should be reconsidered, especially menu matrix data
    const isDataNeverChanged = this.#checkDataNeverChanged({
      userData,
      spMatrixData,
      existingUserData,
      existingSpMatrixData,
      method: "orchestrate",
    });

    if (isDataNeverChanged) return;
    */

    const hashedPassword = !userPassword
      ? existingUserData.password
      : hashData({ data: userPassword });
    let transaction;
    try {
      transaction = await this.transactionHelper.beginTransaction();
      await this.repository.updateWithTransaction({
        data: {
          id: userId,
          uuid: userUUID,
          email: userEmail,
          name: userName,
          phone: userPhone,
          dob: userDOB,
          status: userStatus,
          password: hashedPassword,
          updated_by: sessionUser,
        },
        transaction,
      });

      await this.userSPMatrixRepository.updateWithTransaction({
        data: {
          id: spMatrixId,
          user_uuid: spMatrixUserUUID,
          company_code: spMatrixCompanyCode,
          role_id: spMatrixRoleId,
          branches: spMatrixBranches,
          principals: spMatrixPrincipals,
          status: spMatrixStatus,
          updated_by: sessionUser,
        },
        transaction,
      });

      await this.transactionHelper.commitTransaction(transaction);
    } catch (error) {
      await this.transactionHelper.rollbackTransaction(transaction);
      throw error;
    }
  }

  async update({ userData, sessionUser }) {
    const {
      userId,
      userUUID,
      userEmail,
      userName,
      userPhone,
      userDOB,
      userStatus,
      userPassword,
    } = userData;
    const existingUserData = await this.repository.getByUUID(userUUID);
    if (!existingUserData) throw DataNotFoundError;
    const isDataNeverChanged = this.#checkDataNeverChanged({
      userData,
      existingUserData,
    });

    if (isDataNeverChanged) return;

    const hashedPassword = !userPassword
      ? existingUserData.password
      : hashData({ data: userPassword });
    await this.repository.update({
      id: userId,
      uuid: userUUID,
      email: userEmail,
      name: userName,
      phone: userPhone,
      dob: userDOB,
      status: userStatus,
      password: hashedPassword,
      updated_by: sessionUser,
    });
  }

  async delete(uuid) {
    if (process.env.HARD_DELETE == "true") {
      await this.repository.delete(uuid);
    } else {
      await this.repository.update({
        uuid,
        status: 2,
      });
    }
  }

  async login({ email, password }) {
    const { user, user_sp_matrix, user_menu_matrix } = await provideUserInfo({
      userRepository: this.repository,
      userSPMatrixRepository: this.userSPMatrixRepository,
      userMenuMatrixRepository: this.userMenuMatrixRepository,
      menuRepository: this.menuRepository,
      roleRepository: this.roleRepository,
      email,
    });

    const {
      uuid,
      name,
      phone,
      dob,
      status,
      password: existingPassword,
      verified,
    } = user;

    const hashedPassword = hashData({ data: password });
    if (existingPassword != hashedPassword) {
      throw UnauthenticatedError({
        errorMessage: "user credential is not valid.",
      });
    }

    const generateTokenPayload = {
      uuid,
      email,
    };

    const { token, exp: tokenExp } = this.auth.generateTokenWithExp(
      generateTokenPayload,
      "TOKEN",
    );
    const { token: refreshToken, exp: refreshTokenExp } =
      this.auth.generateTokenWithExp(generateTokenPayload, "REFRESH_TOKEN");

    let userInfo = {};
    if (uuid && name && email && token && refreshToken) {
      userInfo = {
        uuid,
        name,
        email,
        phone,
        dob,
        status,
        verified,
        token,
        token_exp: tokenExp,
        refresh_token: refreshToken,
        refresh_token_exp: refreshTokenExp,
        user_sp_matrix,
        user_menu_matrix,
      };
    }

    return {
      user_info: userInfo,
    };
  }

  async logout({ token }) {
    const decodedData = await this.auth.verifyToken({
      inMemoryRepository: this.inMemoryRepository,
      token,
      tokenSecret: process.env.ACCESS_TOKEN_SECRET,
    });

    if (!decodedData) {
      throw DataNotFoundError;
    }

    const userData = await this.repository.getByEmail(decodedData.email);
    if (!userData) {
      throw DataNotFoundError;
    }

    await this.repository.update({
      uuid: userData.uuid,
      verified: false,
    });

    await this.inMemoryRepository.set(`blacklist_token_${token}`, token);
  }

  async getNewToken({ token: oldToken, refresh_token: oldRefreshToken }) {
    const { email } = await this.auth.decodeToken({
      inMemoryRepository: this.inMemoryRepository,
      token: oldRefreshToken,
      type: "REFRESH_TOKEN",
    });

    const { user, user_sp_matrix, user_menu_matrix } = await provideUserInfo({
      userRepository: this.repository,
      userSPMatrixRepository: this.userSPMatrixRepository,
      userMenuMatrixRepository: this.userMenuMatrixRepository,
      menuRepository: this.menuRepository,
      roleRepository: this.roleRepository,
      email,
    });

    const { uuid, name, phone, dob, status, verified } = user;
    const generateTokenPayload = {
      uuid,
      email,
    };

    const { token, exp: tokenExp } = this.auth.generateTokenWithExp(
      generateTokenPayload,
      "TOKEN",
    );
    const { token: refreshToken, exp: refreshTokenExp } =
      this.auth.generateTokenWithExp(generateTokenPayload, "REFRESH_TOKEN");

    let userInfo = {};
    if (uuid && name && email && token && refreshToken) {
      userInfo = {
        uuid,
        name,
        email,
        phone,
        dob,
        status,
        verified,
        token,
        token_exp: tokenExp,
        refresh_token: refreshToken,
        refresh_token_exp: refreshTokenExp,
        user_sp_matrix,
        user_menu_matrix,
      };

      await this.inMemoryRepository.set(
        `blacklist_token_${oldRefreshToken}`,
        oldRefreshToken,
      );

      await this.inMemoryRepository.set(
        `blacklist_token_${oldToken}`,
        oldToken,
      );
    }

    return {
      user_info: userInfo,
    };
  }

  async getUserBranches({ uuid }) {
    let result = {
      branches: [],
    };

    const userData = await this.#getUser({
      method: "getByUUID",
      params: uuid,
    });

    if (
      !userData.user.user_sp_matrix ||
      userData.user.user_sp_matrix.branches.length < 1
    )
      return result;
    const userBranchCodes = userData.user.user_sp_matrix.branches;
    result = await this.branchRepository.getByCodes({
      companyCode: userData.user.user_sp_matrix.company_code,
      codes: userBranchCodes,
    });

    return {
      branches: result || [],
    };
  }

  async #getUser({ method, params }) {
    let result = {};
    if (typeof this.repository[method] !== "function") return { user: result };
    const user = await this.repository[method](params);
    if (!user) return { user: result };
    result = await constructCompleteUserInfo({
      userSPMatrixRepository: this.userSPMatrixRepository,
      userMenuMatrixRepository: this.userMenuMatrixRepository,
      menuRepository: this.menuRepository,
      user,
    });

    return {
      user: result,
    };
  }

  async #getUserList({ method, params }) {
    const result = [];
    if (typeof this.repository[method] !== "function") return { users: result };
    const users = await this.repository[method](params);
    if (users.length < 1) return { users: result };
    for (const user of users) {
      const constructedUser = await constructCompleteUserInfo({
        userSPMatrixRepository: this.userSPMatrixRepository,
        userMenuMatrixRepository: this.userMenuMatrixRepository,
        menuRepository: this.menuRepository,
        user,
      });

      result.push(constructedUser);
    }

    return { users: result };
  }

  #checkDataNeverChanged({
    method,
    userData,
    spMatrixData,
    menuMatrixData,
    existingUserData,
    existingSpMatrixData,
    existingMenuMatrixData,
  }) {
    const {
      userEmail,
      userName,
      userPhone,
      userDOB,
      userStatus,
      userPassword,
    } = userData;
    const isPasswordNeverChanged = !userPassword;
    let isDataNeverChanged =
      existingUserData.email == userEmail &&
      existingUserData.name == userName &&
      existingUserData.phone == userPhone &&
      existingUserData.dob == userDOB &&
      existingUserData.status == userStatus &&
      isPasswordNeverChanged;

    if (method === "orchestrate") {
      const {
        spMatrixUserUUID,
        spMatrixCompanyCode,
        spMatrixRoleId,
        spMatrixBranches,
        spMatrixPrincipals,
        spMatrixStatus,
      } = spMatrixData;
      isDataNeverChanged =
        isDataNeverChanged &&
        existingSpMatrixData.user_uuid == spMatrixUserUUID &&
        existingSpMatrixData.company_code == spMatrixCompanyCode &&
        existingSpMatrixData.role_id == spMatrixRoleId &&
        existingSpMatrixData.branches == spMatrixBranches &&
        existingSpMatrixData.principals == spMatrixPrincipals &&
        existingSpMatrixData.status == spMatrixStatus;
    }

    return isDataNeverChanged;
  }
}

export default UserService;
