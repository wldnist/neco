import { response } from "../../definitions/common/response.js";

export const GetNewToken = {
  post: {
    tags: ["User [admin]"],
    summary: "Get new token",
    parameters: [
      {
        name: "payload",
        in: "body",
        description: "payload",
        schema: {
          $ref: "#/definitions/UserGetNewTokenReq",
        },
      },
    ],
    produces: ["application/json"],
    responses: {
      200: {
        description: "login success",
        schema: response("UserLoginInfo"),
      },
    },
  },
};
