import { response } from "../../definitions/common/response.js";

export const Update = {
  put: {
    tags: ["User [admin]"],
    summary: "Update user data",
    parameters: [
      {
        name: "uuid",
        in: "path",
        description: "User uuid",
        required: true,
        type: "string",
      },
      {
        name: "payload",
        in: "body",
        description: "payload",
        schema: {
          $ref: "#/definitions/UserUpdateReq",
        },
      },
    ],
    produces: ["application/json"],
    responses: {
      200: {
        description: "User is updated",
        schema: response(),
      },
    },
  },
};
