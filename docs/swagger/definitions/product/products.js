export const Products = {
  properties: {
    products: {
      type: "array",
      items: {
        $ref: "#/definitions/ProductFields",
      },
    },
  },
};
