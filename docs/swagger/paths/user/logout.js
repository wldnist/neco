import { response } from "../../definitions/common/response.js";

export const Logout = {
  post: {
    tags: ["User [admin]"],
    summary: "User logout",
    parameters: [],
    produces: ["application/json"],
    responses: {
      200: {
        description: "logout success",
        schema: response(),
      },
    },
  },
};
