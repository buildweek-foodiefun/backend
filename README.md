# Overview
This repository holds all back-end files and resources for the pintereach application. This repository was made during Lambda School's build week where students from different cohorts joined together to create a functioning application in a week. This project consists of 2 UI engineers, 2 Front End engineers, 1 Back End, and a team lead.

## API URL

## Installation 
Fork/Clone the repository. In the same directory as the package.json, run:

```npm install```

This will install all packages. To start the server:

```npm start```

To start the server using nodemon:

```npm run dev```

To test the repository:

```npm test```

## Test Accounts

```username: admin ```
```password: password ```


## SCHEMA

`users`
```
{
  "id": 1,                            // Integer [Primary key]
  "username": "admin",                // String [Required, Unique]
  "password": "password",             // String [Required]
}
```

# AUTH ROUTES

## **REGISTER**
### **Registers a user**

*Method Url:* `https://foodiefun-api.herokuapp.com/api/auth/register`


*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`     | String | Yes      | Must be unique           |
| `password`     | String | Yes      |                          |

*example:*

```
{
  username: "admin",
  password: "password",
}
```

#### Response

##### 200 (OK)
>If you successfully register a user the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
    "message": "Created user",
    "user": {
        "id": 1,
        "username": "admin"
    }
}
```
##### 400 (Bad Request)
>If you send in invalid/incomplete, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
    "message": "Required parameter missing"
}
```

##### 422 (Unprocessable Entity)
>If the username already exists, the endpoint will return an HTTP response with a status code `422` and a body as below.
```
{
    "message": "Username already exists"
}
```

----

## **LOGIN**
### **Logs a user in**

*Method Url:* `https://foodiefun-api.herokuapp.com/api/auth/login`

*HTTP method:* **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `username`     | String | Yes      | Must match a username in the database |
| `password`     | String | Yes      | Must match a password in the database corresponding username |

*example:*

```
{
  username: "admin",
  password: "password"
}
```

#### Response

##### 200 (OK)
>If you successfully login, the endpoint will return an HTTP response with a status code `200` and a body as below.
```
{
    "message": "You have been identified successfuly",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdmlkIiwiaWF0IjoxNTY0Mzk3ODYyLCJleHAiOjE1NjQ2NTcwNjJ9._wanT3asvdrD-O4qFJhCqCDBFZbDnLFNVETZPaQJ52M"
}
```
##### 400 (Bad Request)
>If you send in invalid fields, the endpoint will return an HTTP response with a status code `400` and a body as below.
```
{
    "message": "Missing required credentials"
}
```
##### 401 (Not Found)
>If you send in an email address that does not match one in the database, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
    "message": "Wrong credentials"
}
```
----
