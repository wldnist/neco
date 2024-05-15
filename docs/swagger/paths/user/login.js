import { response } from "../../definitions/common/response.js";

export const Login = {
  post: {
    tags: ["User [admin]"],
    summary: "User login",
    parameters: [
      {
        name: "payload",
        in: "body",
        description: "payload",
        schema: {
          $ref: "#/definitions/UserLoginReq",
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
