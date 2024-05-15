// export const constructCompleteUserInfo = async ({
//   userSPMatrixRepository,
//   userMenuMatrixRepository,
//   menuRepository,
//   users,
// }) => {
//   for (const user of users) {
//     const userUUID = user.user_uuid;
//     user.password = "";
//     let userSpMatrix = await userSPMatrixRepository.getByUserUUID(userUUID);
//     if (userSpMatrix) {
//       userSpMatrix.branches =
//         JSON.parse(userSpMatrix.branches) || [];
//       userSpMatrix.user_sp_principal =
//         JSON.parse(userSpMatrix.user_sp_principal) || [];
//     }

//     user.user_sp_matrix = userSpMatrix || {};
//     let userMenuMatrix = await userMenuMatrixRepository.getByUserId(userId);
//     if (userMenuMatrix) {
//       userMenuMatrix = await translateMenuDetail({
//         menuRepository,
//         userMenuMatrix,
//       });
//     }

//     user.user_menu_matrix = userMenuMatrix || {};
//   }

//   return users || [];
// };

export const translateMenuDetail = async ({
  menuRepository,
  userMenuMatrix,
}) => {
  const menuIds = JSON.parse(userMenuMatrix.menu_ids) || [];
  if (menuIds.length < 1) return [];
  const menus = await menuRepository.getByIds(menuIds);
  if (menus.length < 1) return [];

  return menus;
};

export const constructCompleteUserInfo = async ({
  userSPMatrixRepository,
  userMenuMatrixRepository,
  menuRepository,
  user,
}) => {
  const userUUID = user.uuid;
  const userMenuMatrix = await userMenuMatrixRepository.getByUserUUID(userUUID);
  const userSpMatrix = await userSPMatrixRepository.getByUserUUID(userUUID);
  if (userSpMatrix) {
    userSpMatrix.branches = JSON.parse(userSpMatrix.branches) || [];
    userSpMatrix.principals = JSON.parse(userSpMatrix.principals) || [];
  }

  user.user_sp_matrix = userSpMatrix || {};
  user.user_menu_matrix = userMenuMatrix || [];
  user.password = "";

  return user;
};
