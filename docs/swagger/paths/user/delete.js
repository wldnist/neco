import { response } from "../../definitions/common/response.js";

export const Delete = {
  delete: {
    tags: ["User [admin]"],
    summary: "Delete user data",
    parameters: [
      {
        name: "uuid",
        in: "path",
        description: "User uuid",
        required: true,
        type: "string",
      },
    ],
    produces: ["application/json"],
    responses: {
      200: {
        description: "User is deleted",
        schema: response(),
      },
    },
  },
};
