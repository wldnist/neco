import { response } from "../../definitions/common/response.js";

export const GetByIds = {
  post: {
    tags: ["User [admin]"],
    summary: "Retrieve users by ids",
    parameters: [
      {
        name: "payload",
        in: "body",
        description: "payload",
        schema: {
          $ref: "#/definitions/UserGetByIdsReq",
        },
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
