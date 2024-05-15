import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { DataNotFoundError } from "../ports/error.js";

export const getCurrentFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const hashData = ({ data }) => {
  return crypto.createHash("md5").update(data).digest("hex");
};

export const generateUniqueUUID = async ({ repository }) => {
  let uuidValue;
  do {
    uuidValue = uuidv4();
  } while (await isUUIDExists({ repository, uuidValue }));

  return uuidValue;
};

export const isUUIDExists = async ({ repository, uuidValue }) => {
  const result = await repository.checkExistingUUID(uuidValue);
  return result.counted_user_uuid > 0;
};

export const translateMenuDetail = async ({
  menuRepository,
  userMenuMatrix,
}) => {
  const menuIds = JSON.parse(userMenuMatrix.menu_ids);
  const menus = await menuRepository.getByIds(menuIds);

  userMenuMatrix.menu_ids = menuIds;
  userMenuMatrix.menus = menus;

  return userMenuMatrix;
};

export const provideUserInfo = async ({
  userRepository,
  userSPMatrixRepository,
  userMenuMatrixRepository,
  menuRepository,
  roleRepository,
  email,
}) => {
  const existingData = await userRepository.getByEmail(email);
  if (!existingData) {
    throw DataNotFoundError;
  }

  const existingUUID = existingData.uuid;
  // const userMenuMatrix = await userMenuMatrixRepository.getByUserUUID(existingUUID);
  const userSpMatrix = await userSPMatrixRepository.getByUserUUID(existingUUID);
  const roleMatrix = await roleRepository.get(userSpMatrix.role_id);
  if (userSpMatrix) {
    userSpMatrix.branches = JSON.parse(userSpMatrix.branches) || [];
    userSpMatrix.principals = JSON.parse(userSpMatrix.principals) || [];
  }

  const role_menu = JSON.parse(roleMatrix.role_menu);
  const header_menu = JSON.parse(roleMatrix.header_menu);

  return {
    user: existingData,
    user_sp_matrix: userSpMatrix || {},
    user_menu_matrix: { role_menu, header_menu } || {},
  };
};
