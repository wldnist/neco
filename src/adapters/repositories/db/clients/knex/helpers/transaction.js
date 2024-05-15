class TransactionHelper {
  constructor(dbClient) {
    this.dbClient = dbClient;
  }

  async beginTransaction() {
    const transaction = await this.dbClient.transaction();
    return transaction;
  }

  async rollbackTransaction(transaction) {
    if (transaction) {
      await transaction.rollback();
    }
  }

  async commitTransaction(transaction) {
    if (transaction) {
      await transaction.commit();
    }
  }
}

export default TransactionHelper;
