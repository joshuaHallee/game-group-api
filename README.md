# game-group-api
API for the Discord bot GameGroup

## Environment File Setup
---
[Discord Developer Docs](https://discord.com/developers/docs/intro) - Create a new application & bot to obtain the bot key

[Steam Web API](https://steamcommunity.com/dev) - Sign up for a developer API key


```
PORT=
MONGO_URI=
BOT_TOKEN=
STEAM_API_KEY=
```
`PORT`: Port for project to run on (default: 5000)

`MONGO_URI`: MongoDB database URL (example: mongodb://localhost:27017/database-name)

`BOT_TOKEN`: Discord bot token

`STEAM_API_KEY`: Steam API key

## Installation Options
---
Below are directions for either development or production use
1. Clone project repository
2. Run `npm install` in project directory
4. Run `npm run dev` for development use
3. Run `npm start` for production use

## Routes
---

GET `/api/user/`

```JSON
Not implemented
```

GET `/api/user/compare?name=Foo%231234&name=Bar%231234`
```JSON
Takes simple or multiple name parameters of Discord usernames, keep in mind of URL supported characters. You will need to convert # to Unicode (%23)
```

POST `/api/user/create`
```JSON
{
    "discordUser":"example#1234",
    "steam64":"01234567890123456"
}
```

PATCH `/api/user/update`
```JSON
{
    "discordUser":"example#1234",
    "steam64":"01234567890123456"
}
```

DELETE `/api/user/delete/:discordUser`
```JSON
Not implemented
```