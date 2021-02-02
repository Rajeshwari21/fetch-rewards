# Fetch Rewards API (Node JS)!:

Fetch Rewards Coding Exercise: Created using REST API with NodeJS.
The IDE used was VS Code.

Dependencies:
- NodeMon
- BodyParser
- Express

Install the dependencies using npm package manager:
`npm install`
In terminal type:
`npm start`

| Route | HTTP Verb  | Description   |
|---|---|---|
| /addPoints | POST | Add points to user account for specific payer and date |
| /deductPoints/:points  | PUT | Deduct points from the user account |
| /balancePoints | GET | Return point balance per user |