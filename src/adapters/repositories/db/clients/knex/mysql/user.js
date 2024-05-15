import UserRepositoryAbstract from "../../../../../../core/ports/repositoryUser.js";

class UserRepository extends UserRepositoryAbstract {
  constructor({ dbClient }) {
    super();

    this.dbClient = dbClient;
  }

  async list({ filter, status }) {
    const queryBuilder = this.dbClient.table("om_user");
    if (filter) {
      queryBuilder.where(function () {
        this.where("email", "like", `%${filter}%`);
        this.orWhere("name", "like", `%${filter}%`);
        this.orWhere("phone", "like", `%${filter}%`);
      });
    }

    if (status) {
      queryBuilder.where("status", status);
    }

    const result = await queryBuilder.select();

    return result;
  }

  async get(id) {
    const result = await this.dbClient.table("om_user").where("id", id).first();

    return result;
  }

  async getByIds(ids) {
    const result = await this.dbClient
      .table("om_user")
      .whereIn("id", ids)
      .select();

    return result;
  }

  async getByUUID(uuid) {
    const result = await this.dbClient
      .table("om_user")
      .where("uuid", uuid)
      .first();

    return result;
  }

  async getByUUIDs(uuids) {
    const result = await this.dbClient
      .table("om_user")
      .whereIn("uuid", uuids)
      .select();

    return result;
  }

  async getByEmail(email) {
    const result = await this.dbClient
      .table("om_user")
      .where("email", email)
      .first();

    return result;
  }

  async create(data) {
    await this.dbClient.table("om_user").insert(data);
  }

  async update(data) {
    await this.dbClient.table("om_user").where("uuid", data.uuid).update(data);
  }

  async delete(uuid) {
    await this.dbClient.table("om_user").where("uuid", uuid).delete();
  }

  async checkExistingUUID(uuid) {
    const result = await this.dbClient
      .table("om_user")
      .count({ counted_uuid: "uuid" })
      .where("uuid", uuid)
      .first();

    return result;
  }

  /** WITH TRANSACTION */
  async createWithTransaction({ data, transaction }) {
    const query = transaction
      ? transaction.table("om_user")
      : this.dbClient.table("om_user");
    await query.insert(data);
  }

  async updateWithTransaction({ data, transaction }) {
    const query = transaction
      ? transaction.table("om_user")
      : this.dbClient.table("om_user");
    await query.where("uuid", data.uuid).update(data);
  }
}

export default UserRepository;
