# MISCAPI -- AutoLogs
### Overview
The Autologs API allows clients to create, read, update, and delete records for logging mileage, fuel consuption, and fillup locations. In addition, clients can manage reference data relative to the project scope. The API is accessible via the `auto-log` app namespace endpoint of MISCAPI.

### Entities
##### User
`User` objects exist within the global `MISCAPI` domain, and so are not directly accessible via the `auto-log` application namespace. However, these are the relevant relationships that exist within the `auto-log` scope.

|Key|Type|Required|Description|
|---|----|--------|-----------|
|id|PK|`true`|Integer primary key for the User|
|vehicles|[Vehicle]|`true`|A User has many Vehicles. If a user has no Vehicle objects associated with it, this will be represented as an empty array.|
|logs|[Log]|`true`|A User has many Logs. If a user has no Log objects associated with it, this will be represented as an empty array.|

##### Vehicle
A `Vehicle` is reference data for the vehicle that a `Log` is applied to. Only `make` and `model` of a vehicle are required for, but many fields exist for client convenience. The `owner` will be supplied by the application logic

|Key|Type|Required|Description|
|---|----|--------|-----------|
|id|PK|`true`|Integer primary key for the Vehicle|
|make|string|`true`|The make of the Vehicle|
|model|string|`true`|The model of the Vehicle|
|year|string|`false`|The manufacturing year of the Vehicle|
|nickname|string|`false`|An optional nickname that can be used in displaying the Vehicle in the client.|
|description|string|`false`|A brief description of the Vehicle|
|owner|FK|`true`|Integer ID representing the User model of the Vehicle owner.  This field is not required for entity creation, as it will be supplied by application logic to be the ID of the current `User`.|
|createdAt|number|`true`|Metafield indicating the date the record was initially created.|
|updatedAt|number|`true`|Metafield indicating the date the record was last updated.|

##### Log
A `Log` is the most critical object within the `auto-log` application namespace, as it is the main intention of the API. They are intentionally made very flexible so that a client may use it as it sees fit. The only required pieces of information that are required are `user` (which will be supplied by the application logic), and the `vehicle`, which is the PK ID of the `Vehicle` that the `Log` belongs to.

|Key|Type|Required|Description|
|---|----|--------|-----------|
|miles|number|`false`|The count of miles to be saved to the log. This can either be trip miles or odometer miles, depending on how the client submits it.|
|fillupAmount|number|`false`|The amount of gasoline put into the Vehicle. Units purposefully left vague so that they can be standardized by the client.|
|fillupCost|number|`false`|The cost of the fuel that was purchased during a fillup. Currency can be standardized by the client.|
|note|string|`false`|Convenience field for client user to submit any notes regarding the log.|
|location|string|`false`|A string name representing the location the log was created/is referring to.|
|coords|string|`false`|GPS coordinates of the location. Can be used for mapping capabilites (external API required)|
|user|FK|`true`|Integer ID representing the `User` model that created the Log. This field is not required for entity creation, as it will be supplied by application logic to be the ID of the current `User`.|
|vehicle|FK|`true`|Integer ID representing the `Vehicle` model the Log is tied to.|
|createdAt|number|`true`|Metafield indicating the date the record was initially created.|
|updatedAt|number|`true`|Metafield indicating the date the record was last updated.|

### API

|Method | Endpoint | Description |
|-------|----------|-------------|
|GET|`/auto-logs/logs`| Retrieves a comprehensive list of all logs for all vehicles that belong to the requesting user. Returns array of Logs.||

```json
[
  {
    "id": 1,
    "createdAt": 1568061175193,
    "updatedAt": 1568061175193,
    "miles": "411.22",
    "fillupAmount": "9.94",
    "fillupCost": "44.14",
    "note": "",
    "location": "gas station at fort collins",
    "coords": "40.5853° N, 105.0844° W",
    "user": 1,
    "vehicle": 1
  },
  {
    "id": 2,
    "createdAt": 1568061175193,
    "updatedAt": 1568061175193,
    "miles": "2587.4",
    "fillupAmount": "8.47",
    "fillupCost": "31.06",
    "note": "",
    "location": "gas station at fort collins",
    "coords": "40.5853° N, 105.0844° W",
    "user": 1,
    "vehicle": 2
  }
]
```
|Method | Endpoint | Description |
|-------|----------|-------------|
|GET|`/auto-logs/logs/:logId`| Retrieves details relative to a specific Log entity that a user has access to. Returns single Log object representing the entity that was requested.|
```json
{
  "id": 3,
  "createdAt": 1568061175193,
  "updatedAt": 1568061175193,
  "miles": "3491.11",
  "fillupAmount": "17.47",
  "fillupCost": "15.97",
  "note": "",
  "location": "gas station at fort collins",
  "coords": "40.5853° N, 105.0844° W",
  "user": 1,
  "vehicle": 3
}
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|POST|`/auto-logs/logs`| Creates a Log for the user. Returns single Log representing the created entity.|
```json
{
  "id": 12,
  "createdAt": 1568061175193,
  "updatedAt": 1568061175193,
  "miles": "3491.11",
  "fillupAmount": "17.47",
  "fillupCost": "15.97",
  "note": "",
  "location": "gas station at fort collins",
  "coords": null,
  "user": 1,
  "vehicle": 3
}
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|PUT|`/auto-logs/logs/:logId`| Updates Log entity by ID. Returns single Log representing the entity that was updated.|
```json
{
  "id": 12,
  "createdAt": 1568061175193,
  "updatedAt": 1588903053350,
  "miles": "3491.11",
  "fillupAmount": "10.42",
  "fillupCost": "489.69",
  "note": "",
  "location": "Gas station at fort collins",
  "coords": null,
  "user": 1,
  "vehicle": 3
}
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|PATCH|`/auto-logs/logs/:logId`| Updates Log entity by ID. Returns single Log representing the entity that was updated.|
```json
{
  "id": 12,
  "createdAt": 1568061175193,
  "updatedAt": 1588903053350,
  "miles": "3491.11",
  "fillupAmount": "10.42",
  "fillupCost": "489.69",
  "note": "",
  "location": "Gas station at fort collins",
  "coords": null,
  "user": 1,
  "vehicle": 3
}
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|DELETE|`/auto-logs/logs/:logId`| Deletes Log entity by ID. Returns single Log representing the entity that was deleted.|
```json
{
  "id": 12,
  "createdAt": 1568061175193,
  "updatedAt": 1588903053350,
  "miles": "3491.11",
  "fillupAmount": "10.42",
  "fillupCost": "489.69",
  "note": "",
  "location": "Gas station at fort collins",
  "coords": null,
  "user": 1,
  "vehicle": 3
}
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|GET|`/auto-logs/vehicles`| Retrieves a comprehensive list of all vehicles that belong to the requesting user. Returns array of Vehicles.|
```json
[
  {
    "id": 1,
    "createdAt": 1568061175149,
    "updatedAt": 1568061175149,
    "make": "Subaru",
    "model": "Outback Impreza",
    "year": "2006",
    "nickname": "Matt's Car",
    "description": "",
    "owner": 1
  },
  {
    "id": 2,
    "createdAt": 1568061175149,
    "updatedAt": 1568061175149,
    "make": "Subaru",
    "model": "Crosstrek",
    "year": "",
    "nickname": "Annie's Car",
    "description": "Big and blue",
    "owner": 1
  }
]
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|GET|`/auto-logs/vehicles/:vehicleId`| Retrieves details relative to a specific Vehicle entity that a user has access to. Returns single Vehicle object representing the entity that was requested.|
```json
{
  "id": 3,
  "createdAt": 1568061175149,
  "updatedAt": 1568061175149,
  "make": "Harley-Davidson",
  "model": "Street",
  "year": "2015",
  "nickname": "Matt's Bike",
  "description": "It's super fly",
  "owner": 1
}
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|GET|`/auto-logs/vehicles/:vehicleId/logs`| Retrieves a list of Logstied to a specific Vehicle entity that a user has access to. Returns array of Log objects tied to the Vehicle entity that was requested.|
```json
[
  {
    "id": 1,
    "createdAt": 1568061175193,
    "updatedAt": 1568061175193,
    "miles": "411.22",
    "fillupAmount": "9.94",
    "fillupCost": "44.14",
    "note": "",
    "location": "gas station at fort collins",
    "coords": "40.5853° N, 105.0844° W",
    "user": 1,
    "vehicle": 1
  },
  {
    "id": 4,
    "createdAt": 1568069057199,
    "updatedAt": 1568069057199,
    "miles": "80081",
    "fillupAmount": "14.56",
    "fillupCost": "45.89",
    "note": "This is the first log I am going to create",
    "location": "Shell on laurel",
    "coords": "N X W Y",
    "user": 1,
    "vehicle": 1
  }
]
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|POST|`/auto-logs/vehicles`| Creates a Vehicle for the user. Returns single Vehicle representing the created entity.|
```json
{
  "id": 70,
  "createdAt": 1568061175149,
  "updatedAt": 1568061175149,
  "make": "Nissan",
  "model": "Sentra",
  "year": "",
  "nickname": "",
  "description": "",
  "owner": 1
}
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|PUT|`/auto-logs/vehicles/:vehicleId`| Updates Vehicle entity by ID. Returns single Vehicle representing the entity that was updated.|
```json
{
  "id": 70,
  "createdAt": 1568061175149,
  "updatedAt": 1588903457804,
  "make": "Nissan",
  "model": "Sentra",
  "year": "2009",
  "nickname": "",
  "description": "Little black with sick rimss",
  "owner": 1
}
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|PATCH|`/auto-logs/vehicles/:vehicleId`| Updates Vehicle entity by ID. Returns single Vehicle representing the entity that was updated.|
```json
{
  "id": 70,
  "createdAt": 1568061175149,
  "updatedAt": 1588903457804,
  "make": "Nissan",
  "model": "Sentra",
  "year": "2009",
  "nickname": "",
  "description": "Little black with sick rimss",
  "owner": 1
}
```

|Method | Endpoint | Description |
|-------|----------|-------------|
|DELETE|`/auto-logs/vehicles/:vehicleId`| Deletes Vehicle entity by ID. Returns single Vehicle representing the entity that was deleted.|
```json
{
  "id": 70,
  "createdAt": 1568061175149,
  "updatedAt": 1588903457804,
  "make": "Nissan",
  "model": "Sentra",
  "year": "2009",
  "nickname": "",
  "description": "Little black with sick rimss",
  "owner": 1
}
```
