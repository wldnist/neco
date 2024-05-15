import { newHandlerWithExceptionCatcher } from "../middlewares/helpers.js";
import { successResponse } from "../middlewares/responseBuilder.js";

class UserRouteHandler {
  constructor({ userService }) {
    this.service = userService;
    this.channelName = process.env.REDIS_LOG_CHANNEL_NAME;
    this.withLog = process.env.WITH_LOG;
  }

  list = newHandlerWithExceptionCatcher(async (req, res) => {
    const result = await this.service.list({
      filter: req.query.filter,
      status: req.query.status,
    });

    res.status(200).json(successResponse({ data: result }));
  });

  getByIds = newHandlerWithExceptionCatcher(async (req, res) => {
    const result = await this.service.getByIds(req.body.ids);

    res.status(200).json(successResponse({ data: result }));
  });

  getByUUIDs = newHandlerWithExceptionCatcher(async (req, res) => {
    const result = await this.service.getByUUIDs(req.body.uuids);

    res.status(200).json(successResponse({ data: result }));
  });

  get = newHandlerWithExceptionCatcher(async (req, res) => {
    const result = await this.service.get(req.params.id);

    res.status(200).json(successResponse({ data: result }));
  });

  getByUUID = newHandlerWithExceptionCatcher(async (req, res) => {
    const result = await this.service.getByUUID(req.params.uuid);

    res.status(200).json(successResponse({ data: result }));
  });

  getByEmail = newHandlerWithExceptionCatcher(async (req, res) => {
    const result = await this.service.getByEmail(req.params.email);

    res.status(200).json(successResponse({ data: result }));
  });

  create = newHandlerWithExceptionCatcher(async (req, res) => {
    await this.service.create({
      userData: {
        userEmail: req.body.email,
        userName: req.body.name,
        userPhone: req.body.phone,
        userDOB: req.body.dob,
        userStatus: req.body.status,
        userPassword: req.body.password,
      },
      sessionUser: req.user.email,
    });

    res.status(201).json(successResponse());
  });

  orchestrateCreateUser = newHandlerWithExceptionCatcher(async (req, res) => {
    const branches = req.body.sp_matrix_data.branches;
    const principals = req.body.sp_matrix_data.principals;
    const menuIds = req.body.menu_matrix_data.menu_ids;
    const stringifiedBranches = JSON.stringify(branches);
    const stringifiedPrincipals = JSON.stringify(principals);
    const stringifiedMenuIds = JSON.stringify(menuIds);

    await this.service.orchestrateCreateUser({
      userData: {
        userEmail: req.body.user_data.email,
        userName: req.body.user_data.name,
        userPhone: req.body.user_data.phone,
        userDOB: req.body.user_data.dob,
        userStatus: req.body.user_data.status,
        userPassword: req.body.user_data.password,
      },
      spMatrixData: {
        spMatrixCompanyCode: req.body.sp_matrix_data.company_code,
        spMatrixRoleId: req.body.sp_matrix_data.role_id,
        spMatrixBranches: stringifiedBranches,
        spMatrixPrincipals: stringifiedPrincipals,
        spMatrixStatus: req.body.sp_matrix_data.status,
      },
      menuMatrixData: req.body.menu_matrix_data,
      sessionUser: req.user.email,
    });

    res.status(201).json(successResponse());
  });

  update = newHandlerWithExceptionCatcher(async (req, res) => {
    await this.service.update({
      userData: {
        userUUID: req.params.uuid,
        userEmail: req.body.email,
        userName: req.body.name,
        userPhone: req.body.phone,
        userDOB: req.body.dob,
        userStatus: req.body.status,
        userPassword: req.body.password,
      },
      sessionUser: req.user.email,
    });

    res.status(200).json(successResponse());
  });

  orchestrateUpdateUser = newHandlerWithExceptionCatcher(async (req, res) => {
    const userUUID = req.params.uuid;
    const branches = req.body.sp_matrix_data.branches;
    const principals = req.body.sp_matrix_data.principals;
    const menuIds = req.body.menu_matrix_data.menu_ids;
    const stringifiedBranches = JSON.stringify(branches);
    const stringifiedPrincipals = JSON.stringify(principals);
    const stringifiedMenuIds = JSON.stringify(menuIds);

    await this.service.orchestrateUpdateUser({
      userData: {
        userUUID,
        userEmail: req.body.user_data.email,
        userName: req.body.user_data.name,
        userPhone: req.body.user_data.phone,
        userDOB: req.body.user_data.dob,
        userStatus: req.body.user_data.status,
        userPassword: req.body.user_data.password,
      },
      spMatrixData: {
        spMatrixId: req.body.sp_matrix_data.id,
        spMatrixUserUUID: userUUID,
        spMatrixCompanyCode: req.body.sp_matrix_data.company_code,
        spMatrixRoleId: req.body.sp_matrix_data.role_id,
        spMatrixBranches: stringifiedBranches,
        spMatrixPrincipals: stringifiedPrincipals,
        spMatrixStatus: req.body.sp_matrix_data.status,
      },
      menuMatrixData: req.body.menu_matrix_data,
      sessionUser: req.user.email,
    });

    res.status(200).json(successResponse());
  });

  delete = newHandlerWithExceptionCatcher(async (req, res) => {
    await this.service.delete(req.params.uuid);

    res.status(200).json(successResponse());
  });

  getUserBranches = newHandlerWithExceptionCatcher(async (req, res) => {
    const result = await this.service.getUserBranches({
      uuid: req.params.uuid,
    });

    res.status(200).json(successResponse({ data: result }));
  });

  login = newHandlerWithExceptionCatcher(async (req, res) => {
    const result = await this.service.login({
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json(successResponse({ data: result }));
  });

  logout = newHandlerWithExceptionCatcher(async (req, res) => {
    await this.service.logout({
      token: req.headers.authorization.split(" ")[1],
    });

    res.status(200).json(successResponse());
  });

  getNewToken = newHandlerWithExceptionCatcher(async (req, res) => {
    const result = await this.service.getNewToken({
      token: req.headers.authorization.split(" ")[1],
      refresh_token: req.body.refresh_token,
    });

    res.status(200).json(successResponse({ data: result }));
  });

  authenticateToken = newHandlerWithExceptionCatcher(async (req, res) => {
    const decodedToken = await this.service.auth.authenticateProcess(req);
    const result = {
      decoded_token: decodedToken,
    };

    res.status(200).json(successResponse({ data: result }));
  });
}

export default UserRouteHandler;
