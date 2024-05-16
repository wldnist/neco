export const Categories = {
  properties: {
    categories: {
      type: "array",
      items: {
        $ref: "#/definitions/CategoryFields",
      },
    },
  },
};
