'use strict';
module.exports = function(app) {
    const rewardsController = require('../controller/rewardsPointController.js');
    // Create new rewards.
    app.route('/addPoints').post(rewardsController.create_new_rewards);
    // Deduct the reward points and update the rewards.
    app.route('/deductPoints/:points').put(rewardsController.deduct_points);
    // Show the balanace reward points after deduction.
    app.route("/balancePoints").get(rewardsController.getBalancePoints);
}
