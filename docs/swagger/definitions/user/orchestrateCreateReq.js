export const OrchestrateCreateReq = {
  properties: {
    user_data: {
      $ref: "#/definitions/UserCreateReq",
    },
    sp_matrix_data: {
      $ref: "#/definitions/SPMatrixCreateReq",
    },
    menu_matrix_data: {
      type: "array",
      items: {
        $ref: "#/definitions/MenuMatrixCreateReq",
      },
    },
  },
};
