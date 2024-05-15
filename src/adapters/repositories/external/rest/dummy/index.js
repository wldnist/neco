import DummyRestAbstract from "../../../../../core/ports/restDummy.js";
import { baseUrl } from "./config.js";

class DummyRest extends DummyRestAbstract {
  constructor({ httpClient }) {
    super();

    this.httpClient = httpClient;
  }

  async authenticateToken({ payload, headers }) {
    try {
      const response = await this.httpClient.post(
        `${baseUrl}/token/authenticate`,
        payload,
        { headers },
      );
      return response.data.data.decoded_token;
    } catch (error) {
      if (error.response.data.error_message) {
        throw UnauthenticatedError({
          errorMessage: error.response.data.error_message,
        });
      }

      throw error;
    }
  }
}

export default DummyRest;
