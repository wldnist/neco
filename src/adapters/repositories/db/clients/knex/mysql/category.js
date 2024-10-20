import CategoryRepositoryAbstract from "../../../../../../core/ports/repositoryCategory.js";
import { checkExistingUUIDProcess } from "./util.js";

class CategoryRepository extends CategoryRepositoryAbstract {
  constructor({ dbClient }) {
    super();

    this.dbClient = dbClient;
  }

  async list({ filter, status }) {
    const queryBuilder = this.dbClient.table("category");
    if (filter) {
      queryBuilder.where(function () {
        this.where("code", "like", `%${filter}%`);
        this.orWhere("name", "like", `%${filter}%`);
      });
    }

    if (status) {
      queryBuilder.where("status", status);
    }

    const result = await queryBuilder.select();

    return result;
  }

  async get(id) {
    const result = await this.dbClient
      .table("category")
      .where("id", id)
      .first();

    return result;
  }

  async getByIds(ids) {
    const result = await this.dbClient
      .table("category")
      .whereIn("id", ids)
      .select();

    return result;
  }

  async getByUUID(uuid) {
    const result = await this.dbClient
      .table("category")
      .where("uuid", uuid)
      .first();

    return result;
  }

  async getByUUIDs(uuids) {
    const result = await this.dbClient
      .table("category")
      .whereIn("uuid", uuids)
      .select();

    return result;
  }

  async getByCode(code) {
    const result = await this.dbClient
      .table("category")
      .where("code", code)
      .first();

    return result;
  }

  async getByCodes(codes) {
    const result = await this.dbClient
      .table("category")
      .whereIn("code", codes)
      .select();

    return result;
  }

  async create({ data, transaction }) {
    const query = transaction
      ? transaction.table("category")
      : this.dbClient.table("category");
    await query.insert(data);
  }

  async update({ data, transaction }) {
    const query = transaction
      ? transaction.table("category")
      : this.dbClient.table("category");
    await query.where("id", data.id).update(data);
  }

  async updateByUUID({ data, transaction }) {
    const query = transaction
      ? transaction.table("category")
      : this.dbClient.table("category");
    await query.where("uuid", data.uuid).update(data);
  }

  async delete({ id, transaction }) {
    const query = transaction
      ? transaction.table("category")
      : this.dbClient.table("category");
    await query.where("id", id).delete();
  }

  async deleteByUUID({ uuid, transaction }) {
    const query = transaction
      ? transaction.table("category")
      : this.dbClient.table("category");
    await query.where("uuid", uuid).delete();
  }

  async checkExistingUUID(uuid) {
    const result = await checkExistingUUIDProcess({
      dbClient: this.dbClient,
      tableName: "category",
      uuid,
    });

    return result;
  }
}

export default CategoryRepository;
