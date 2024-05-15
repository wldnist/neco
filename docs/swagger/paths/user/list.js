import { response } from "../../definitions/common/response.js";

export const List = {
  get: {
    tags: ["User [admin]"],
    summary: "Retrieve all user",
    parameters: [
      {
        name: "filter",
        in: "query",
        description: "filter",
        required: false,
        type: "string",
      },
      {
        name: "status",
        in: "query",
        description: "status",
        required: false,
        type: "integer",
      },
    ],
    responses: {
      200: {
        description: "OK",
        schema: response("Users"),
      },
    },
  },
};
