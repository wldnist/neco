const loginUserInfoType = `
  type UserSPMatrix {
    id: Int,
    user_uuid: String,
    assignment: String,
    company: String,
    role_id: Int,
    branches: [String],
    principals: [String],
    status: Boolean,
    created_by: String,
    updated_by: String,
    created_at: String,
    updated_at: String,
  }
  
  type UserMenuMatrix {
    id: Int,
    user_uuid: String,
    menu_ids: [Int],
    created_by: String,
    updated_by: String,
    created_at: String,
    updated_at: String,
  }

  type UserInfo {
    uuid: String,
    name: String,
    email: String,
    phone: String,
    dob: String,
    status: Int,
    verified: Boolean,
    token: String,
    token_exp: Int,
    refresh_token: String,
    refresh_token_exp: Int,
    user_sp_matrix: UserSPMatrix,
    user_menu_matrix: UserMenuMatrix,
  }
  
  type LoginUserInfo {
    user_info: UserInfo
  }
`;

export default loginUserInfoType;
