export const OrchestrateUpdateReq = {
  properties: {
    user_data: {
      $ref: "#/definitions/UserUpdateReq",
    },
    sp_matrix_data: {
      $ref: "#/definitions/SPMatrixUpdateReq",
    },
    menu_matrix_data: {
      type: "array",
      items: {
        $ref: "#/definitions/MenuMatrixUpdateReq",
      },
    },
  },
};
