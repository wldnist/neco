import { response } from "../../definitions/common/response.js";

export const Create = {
  post: {
    tags: ["User [admin]"],
    summary: "Create user data",
    parameters: [
      {
        name: "payload",
        in: "body",
        description: "payload",
        schema: {
          $ref: "#/definitions/UserCreateReq",
        },
      },
    ],
    produces: ["application/json"],
    responses: {
      201: {
        description: "New user is created",
        schema: response(),
      },
    },
  },
};
