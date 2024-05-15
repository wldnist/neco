export const response = (data) => {
  let dataRef = {
    type: "string",
  };

  if (data) {
    dataRef = {
      $ref: `#/definitions/${data}`,
    };
  }

  return {
    properties: {
      status: {
        type: "string",
      },
      data: dataRef,
      error_message: {
        type: "string",
      },
    },
  };
};
