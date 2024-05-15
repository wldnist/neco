import { response } from "../../definitions/common/response.js";

export const Get = {
  get: {
    tags: ["User [admin]"],
    summary: "Retrieve user by id",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "User id",
        required: true,
        type: "integer",
      },
    ],
    responses: {
      200: {
        description: "OK",
        schema: response("User"),
      },
    },
  },
};
