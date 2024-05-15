import swaggerJSDoc from "swagger-jsdoc";
import * as definitions from "./definitions/index.js";
import * as paths from "./paths/index.js";

const swaggerDefinition = {
  info: {
    title: "NECO",
    version: "1.0.0",
    description: "SORANECO backend service API documentation",
  },
  basePath: "/api/v1",
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [{ Bearer: [] }],
  paths: {
    /** USER */
    "/user": paths.user.List,
    "/user/ids": paths.user.GetByIds,
    "/user/uuids": paths.user.GetByUUIDs,
    "/user/{id}": paths.user.Get,
    "/user/uuid/{uuid}": paths.user.GetByUUID,
    "/user/email/{email}": paths.user.GetByEmail,
    "/user/create": paths.user.Create,
    "/user/orchestrate/create": paths.user.OrchestrateCreate,
    "/user/{uuid}/update": paths.user.Update,
    "/user/{uuid}/orchestrate/update": paths.user.OrchestrateUpdate,
    "/user/{uuid}/delete": paths.user.Delete,
    "/user/{uuid}/branches": paths.user.GetUserBranches,
    "/user/login": paths.user.Login,
    "/user/logout": paths.user.Logout,
    "/user/token": paths.user.GetNewToken,
  },
  definitions: {
    /** USER */
    UserCreateReq: definitions.user.CreateReq,
    UserFields: definitions.user.Fields,
    UserGetByIdsReq: definitions.user.GetByIdsReq,
    UserGetByUUIDsReq: definitions.user.GetByUUIDsReq,
    UserGetNewTokenReq: definitions.user.GetNewTokenReq,
    UserLoginReq: definitions.user.LoginReq,
    UserLoginInfo: definitions.user.LoginInfo,
    UserLoginInfoFields: definitions.user.LoginInfoFields,
    UserOrchestrateCreateReq: definitions.user.OrchestrateCreateReq,
    UserOrchestrateUpdateReq: definitions.user.OrchestrateUpdateReq,
    UserUpdateReq: definitions.user.UpdateReq,
    User: definitions.user.User,
    Users: definitions.user.Users,
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/adapters/transports/rest/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
