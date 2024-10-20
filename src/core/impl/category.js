import {
  DataNotFoundError,
  DuplicateDataError,
  RequiredFieldsError,
  UnauthenticatedError,
} from "../ports/error.js";
import CategoryServiceAbstract from "../ports/serviceCategory.js";
import {
  generateUniqueUUID,
  hashData,
  provideUserInfo,
} from "../utils/util.js";
import { constructCompleteUserInfo, retrieveDataProcess } from "./helper.js";

class CategoryService extends CategoryServiceAbstract {
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
    this.entityNameSingular = "category";
    this.entityNamePlural = "categories";
  }

  async list(data) {
    return await this.#retrieveData({
      method: "list",
      resultKey: this.entityNamePlural,
      params: data,
    });
  }

  async get(id) {
    return await this.#retrieveData({
      method: "get",
      resultKey: this.entityNameSingular,
      params: id,
    });
  }

  async getByIds(ids) {
    return await this.#retrieveData({
      method: "getByIds",
      resultKey: this.entityNamePlural,
      params: ids,
    });
  }

  async getByUUID(uuid) {
    return await this.#retrieveData({
      method: "getByUUID",
      resultKey: this.entityNameSingular,
      params: uuid,
    });
  }

  async getByUUIDs(uuids) {
    return await this.#retrieveData({
      method: "getByUUIDs",
      resultKey: this.entityNamePlural,
      params: uuids,
    });
  }

  async getByCode(code) {
    return await this.#retrieveData({
      method: "getByUUID",
      resultKey: this.entityNameSingular,
      params: uuid,
    });
  }

  async getByCodes(codes) {
    return await this.#retrieveData({
      method: "getByUUIDs",
      resultKey: this.entityNamePlural,
      params: uuids,
    });
  }

  async create({ userData, sessionUser }) {
    // const {
    //   userEmail,
    //   userName,
    //   userPhone,
    //   userDOB,
    //   userStatus,
    //   userPassword,
    // } = userData;
    // const existingData = await this.repository.getByEmail(userEmail);
    // if (existingData) throw DuplicateDataError;
    // if (!userPassword) throw RequiredFieldsError({ field: "password" });
    // const hashedPassword = hashData({ data: userPassword });
    // const generatedUUID = await generateUniqueUUID({
    //   repository: this.repository,
    // });

    // await this.repository.create({
    //   uuid: generatedUUID,
    //   email: userEmail,
    //   name: userName,
    //   phone: userPhone,
    //   dob: userDOB,
    //   status: userStatus,
    //   password: hashedPassword,
    //   verified: false,
    //   created_by: sessionUser,
    // });
  }

  async update({ userData, sessionUser }) {
    // const {
    //   userId,
    //   userUUID,
    //   userEmail,
    //   userName,
    //   userPhone,
    //   userDOB,
    //   userStatus,
    //   userPassword,
    // } = userData;
    // const existingUserData = await this.repository.getByUUID(userUUID);
    // if (!existingUserData) throw DataNotFoundError;
    // const isDataNeverChanged = this.#checkDataNeverChanged({
    //   userData,
    //   existingUserData,
    // });

    // if (isDataNeverChanged) return;

    // const hashedPassword = !userPassword
    //   ? existingUserData.password
    //   : hashData({ data: userPassword });
    // await this.repository.update({
    //   id: userId,
    //   uuid: userUUID,
    //   email: userEmail,
    //   name: userName,
    //   phone: userPhone,
    //   dob: userDOB,
    //   status: userStatus,
    //   password: hashedPassword,
    //   updated_by: sessionUser,
    // });
  }
  
  async updateByUUID({ userData, sessionUser }) {
    // const {
    //   userId,
    //   userUUID,
    //   userEmail,
    //   userName,
    //   userPhone,
    //   userDOB,
    //   userStatus,
    //   userPassword,
    // } = userData;
    // const existingUserData = await this.repository.getByUUID(userUUID);
    // if (!existingUserData) throw DataNotFoundError;
    // const isDataNeverChanged = this.#checkDataNeverChanged({
    //   userData,
    //   existingUserData,
    // });

    // if (isDataNeverChanged) return;

    // const hashedPassword = !userPassword
    //   ? existingUserData.password
    //   : hashData({ data: userPassword });
    // await this.repository.update({
    //   id: userId,
    //   uuid: userUUID,
    //   email: userEmail,
    //   name: userName,
    //   phone: userPhone,
    //   dob: userDOB,
    //   status: userStatus,
    //   password: hashedPassword,
    //   updated_by: sessionUser,
    // });
  }

  async delete(id) {
    // if (process.env.HARD_DELETE == "true") {
    //   await this.repository.delete(id);
    // } else {
    //   await this.repository.update({
    //     id,
    //     status: 2,
    //   });
    // }
  }

  async deleteByUUID(uuid) {
    // if (process.env.HARD_DELETE == "true") {
    //   await this.repository.delete(uuid);
    // } else {
    //   await this.repository.update({
    //     uuid,
    //     status: 2,
    //   });
    // }
  }

  async #retrieveData({ method, resultKey, params }) {
    return await retrieveDataProcess({ 
      repository: this.repository, 
      method, 
      resultKey, 
      params
    });
  }
}

export default CategoryService;
