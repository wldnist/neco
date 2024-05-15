export const CreateReq = {
  properties: {
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
    password: {
      type: "string",
    },
  },
};
