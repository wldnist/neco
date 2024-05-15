export const Fields = {
  properties: {
    id: {
      type: "integer",
    },
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
    password: {
      type: "string",
    },
    verified: {
      type: "boolean",
    },
    created_by: {
      type: "string",
    },
    updated_by: {
      type: "string",
    },
    created_at: {
      type: "string",
      format: "date-time",
    },
    updated_at: {
      type: "string",
      format: "date-time",
    },
  },
};
