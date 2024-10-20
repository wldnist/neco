import RepositoryAbstract from "./repository.js";

class ProductRepositoryAbstract extends RepositoryAbstract {
  constructor() {
    super();

    if (this.constructor == ProductRepositoryAbstract) {
      throw new Error("Abstract classes couldn't be instantiated.");
    }
  }

  async getByIds() {
    throw new Error("Method 'getByIds()' must be implemented.");
  }
  
  async getByUUID() {
    throw new Error("Method 'getByUUID()' must be implemented.");
  }
  
  async getByUUIDs() {
    throw new Error("Method 'getByUUIDs()' must be implemented.");
  }
  
  async getByCode() {
    throw new Error("Method 'getByCode()' must be implemented.");
  }
  
  async getByCodes() {
    throw new Error("Method 'getByCodes()' must be implemented.");
  }
  
  async updateByUUID() {
    throw new Error("Method 'updateByUUID()' must be implemented.");
  }
  
  async deleteByUUID() {
    throw new Error("Method 'deleteByUUID()' must be implemented.");
  }
  
  async checkExistingUUID() {
    throw new Error("Method 'checkExistingUUID()' must be implemented.");
  }
}

export default ProductRepositoryAbstract;
