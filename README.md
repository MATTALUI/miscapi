# MISCAPI
### Overview
MISCAPI is a multi-namespaces API containing a framework for building smaller sub-APIs using [Sails.js](https://sailsjs.com/).

### Making Requests
There are **two critical keys** in sending requests to most `MISCAPI` applications. The first is an application identifier and the second is some sort of user authentication.
##### Application Authorization
The application identifier is a unique, secret string that is issued to any registered clients. It is subapplication specific, so multiple secrets will be needed for any cross-namespace applications. It is supplied to the application using the `Authorization` header with a `Basic:` value.
```
Authorization Basic: $APPLICATION_AUTHORIZATION_KEY
```

##### User Authentication
Most subapplications require an authenticated user in order to provide access. A user is required unless otherwise stated. This user can be provided in one of two ways.

**The first** is using a browser-based cookie system. When successful `POST` requests are made to the user session endpoing, the user token is set as a cookie. This is all that is needed for most web-based clients.

**The second** is by providing a user token via the `X-Identity` header. This is a less preferred method and will be evaluated only if the access cookie does not exist. The user token is returned as part of the authentication process. **These tokens are used to identify users and access information, so they should be closely guarded.**
```
X-Identity $AUTHORIZED_USER_TOKEN
```
##### Request Example
```bash
curl -H "Authorization: Basic: $AUTOLOGS_AUTHORIZATION_KEY" -H "X-Identity: $AUTHORIZED_USER_TOKEN" http://miscapi.herokuapp.com/auto-logs/logs
```


### Available APIs
- [AutoLogs](./api/controller/autolog/README.md)
- [Fastlang](./api/controller/fastlang/README.md)

### Global
#### Users
`User` objects exist within the global `MISCAPI` domain. They are critical in the process of getting authenticated. Since it is is a critical preauthorization step to have a user, **`User` endpoints do not require typical authorization steps.**

|Key|Type|Required|Description|
|---|----|--------|-----------|
|id|PK|`true`|Integer primary key for the User|
|email|string|`true`|A unique email address for a user.|
|firstName|string|`true`|User's first name.|
|lastName|string|`true`|User's last name|
|nickname|string|`false`|Optional field for Client convenience used for an easy reference to a user|
|description|string|`false`|Optional field for Client convenience used to describe a user|
|vehicles|[[Vehicle](./api/controller/autolog/README.md)]|`true`|A User has many Vehicles. If a user has no Vehicle objects associated with it, this will be represented as an empty array.|
|logs|[[Log](./api/controller/autolog/README.md)]|`true`|A User has many Logs. If a user has no Log objects associated with it, this will be represented as an empty array.|
|cards|[[Card](./api/controller/fastlang/README.md)]|`true`|A User has many cards. If a user has no Cards associated with it, this will be represented with an empty array.|
|createdAt|number|`true`|Metafield indicating the date the record was initially created.|
|updatedAt|number|`true`|Metafield indicating the date the record was last updated.|

##### Endpoints

|Method | Endpoint | Description |
|-------|----------|-------------|
|GET|`/global/user`| Returns the currently logged in user. Empty object if not logged in.|
```json
{
  "id": 1,
  "createdAt": 1568061175093,
  "updatedAt": 1588962034630,
  "email": "matt@example.com",
  "firstName": "Matthew",
  "lastName": "Hummer",
  "nickname": "MATTALUI",
  "description": "I am Matt."
}
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|POST|`/global/users`| Registers a new user to `MISCAPI`. In addition to the base `User` attributes, this endpoint also requires a `password` and `confirmPassword` data in order to enable a password for the user. These two much match in order to register the user. Returns the newly created user entity.|
```json
{
  "id": 2,
  "createdAt": 1588970425600,
  "updatedAt": 1588970425600,
  "email": "matt2@example.com",
  "firstName": "Matt",
  "lastName": "Bummer",
  "nickname": "NEW MATTALUI",
  "description": "I am Matt."
}
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|POST|`/global/user/session`| Logs a user in based on the provided `email` and `password` data that is submitted. Returns an object containing the `User` data, as well as an authenticated user token for the use  of non-cookie based clients|
```json
{
  "user": {
    "id": 1,
    "createdAt": 1568061175093,
    "updatedAt": 1588962034630,
    "email": "matt@example.com",
    "firstName": "Matthew",
    "lastName": "Hummer",
    "nickname": "MATTALUI",
    "description": "I am Matt."
  },
  "userToken": "SUPERSECRETTOKENWOWZA"
}
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|DELETE|`/global/user/session`| Logs a user out of the application by removing any cookie-based application data. Returns boolean indicating whether or not logout was successful.|
```json
true
```

### Contributing
To contribute, clone the repo and open a Pull Request. Contributing guidelines to come...
