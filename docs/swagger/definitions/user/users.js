export const Users = {
  properties: {
    users: {
      type: "array",
      items: {
        $ref: "#/definitions/UserFields",
      },
    },
  },
};
