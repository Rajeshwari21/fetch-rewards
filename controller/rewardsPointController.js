const Rewards = require('../models/rewardsModel');

// Store the user reward points
var rewards = [];

exports.create_new_rewards = function(req, res) {
    // let userid = rewards.length+1;
    let name = req.body.payerName;
    if (checkIfNull("payerName", name, res)) return;
 
    let points = req.body.points;
    let balancePoints = points.split(" ");
    if (checkIfNull("userPoints", points, res)) return;

    let tDate = req.body.transactionDate;
    if (checkIfNull("transactionDate", tDate, res)) return;

    let data = new Rewards(name, points, tDate, parseInt(balancePoints), 0);
    // While adding check if the payerName exists in the array.
    // if payers points is in negative update it with the recent points.
    flag = false;
    let p = points.split(" ");
    if (rewards.length > 0) {
        for (let i in rewards) { 
            let userPoints = rewards[i].userPoints;
            let splitValue = userPoints.split(" ");
            let earlierPoint = splitValue[0];
            if (rewards[i].payerName == name && parseInt(p[0]) < 0 && parseInt(earlierPoint) > 0) {
                flag = true;
                let userPoints = rewards[i].userPoints;
                let splitValue = userPoints.split(" ");
                let earlierPoint = splitValue[0];
                if (parseInt(p[0]) + parseInt(earlierPoint) > 0) {
                    rewards[i].userPoints = (parseInt([p[0]]) + parseInt(earlierPoint)) + " points";
                    rewards[i].balance = (parseInt(points) + parseInt(earlierPoint));
                    break;
                }
            }
        }
    }
    if(flag == false || rewards.length == 0) {
        rewards.push(data);
    }
    res.json(rewards);
}

// Deduct Points from the user.
exports.deduct_points = function(req, res) {
    rewardsDeduction = [];
    let deductPoints = parseInt(req.params.points);
    for (let i in rewards) { 
        let userPoints = rewards[i].userPoints;
        let actualPoints = parseInt(userPoints.split(" ")[0]);
        if (actualPoints != 0 && deductPoints > 0) {
            if (actualPoints < deductPoints) {
                remaining = deductPoints - actualPoints;
                let deductedPoints = "-"+ actualPoints + " points";
                rewards[i].balance = 0;
                rewards[i].deduction = deductPoints;
                rewards[i].userPoints = 0 + "points";
                let pName = rewards[i].payerName;
                deductPoints = remaining;
                rewardsDeduction.push({
                    pName,
                    deductedPoints,
                    "time" : "now",
                });
            } else {
                remaining = actualPoints - deductPoints;
                let pName = rewards[i].payerName;
                let deductedPoints = "-" + deductPoints + " points";
                rewards[i].userPoints = remaining + "points";
                rewards[i].balance = remaining
                rewards[i].deduction = deductedPoints;
                rewardsDeduction.push({
                    pName,
                    deductedPoints,
                    "time" : "now",
                });
                deductPoints = 0;
            }
        }   
    }
    res.json(rewardsDeduction);
}

// Get the balance points after the decution.
exports.getBalancePoints = function(req, res) {
    var balanceAfterDeduction = [];
    console.log(rewards);
    for (let i in rewards) {
        let payerName = rewards[i].payerName;
        let balancePoints = rewards[i].balance;
        let foundPayer = balanceAfterDeduction.find(payer => payer.payerName === payerName);
        if (foundPayer) {
            foundPayer.balancePoints += balancePoints;
        } else {
            balanceAfterDeduction.push({
                payerName,
                balancePoints
            });     
        }
    }
    res.json(balanceAfterDeduction)
}

// Function to check provided parameter is null ot not.
const checkIfNull = function(field, data, res) {
    if(!data) {
        res.status(400).send({
            message: 'Must provide ' + field
        });
        return true;
    }
}