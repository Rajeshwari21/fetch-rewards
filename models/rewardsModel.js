class Rewards {
    constructor(name, points, transactionDate, balancePoints, deductedPoints) {
      // this.id = id;
      this.payerName = name;
      this.userPoints = points;
      this.transactionDate = transactionDate;
      this.balance = balancePoints;
      this.deduction = deductedPoints
    }
}
module.exports = Rewards;