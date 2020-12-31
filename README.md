# game-group-api
API for the Discord bot GameGroup

## Routes

GET `/api/user/`

```JSON
```

GET `/api/user/compare`
```JSON
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

DELETE `/api/user/delete`
```JSON
{
    "discordUser":"example#1234",
    "steam64":"01234567890123456"
}
```