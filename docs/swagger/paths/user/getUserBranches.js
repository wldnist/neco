import { response } from "../../definitions/common/response.js";

export const GetUserBranches = {
  get: {
    tags: ["User [admin]"],
    summary: "Retrieve user branches",
    parameters: [
      {
        name: "uuid",
        in: "path",
        description: "User uuid",
        required: true,
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "OK",
        schema: response("Branches"),
      },
    },
  },
};
