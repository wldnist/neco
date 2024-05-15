export const LoginInfoFields = {
  properties: {
    uuid: {
      type: "string",
    },
    email: {
      type: "string",
    },
    name: {
      type: "string",
    },
    phone: {
      type: "string",
    },
    dob: {
      type: "string",
      format: "date-time",
    },
    status: {
      type: "integer",
    },
    verified: {
      type: "boolean",
    },
    token: {
      type: "string",
    },
    refresh_token: {
      type: "string",
    },
    token_exp: {
      type: "string",
    },
    refresh_token_exp: {
      type: "string",
    },
    user_sp_matrix: {},
    user_menu_matrix: {},
  },
};
