import { response } from "../../definitions/common/response.js";

export const GetByEmail = {
  get: {
    tags: ["User [admin]"],
    summary: "Retrieve user by email",
    parameters: [
      {
        name: "email",
        in: "path",
        description: "User email",
        required: true,
        type: "string",
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
