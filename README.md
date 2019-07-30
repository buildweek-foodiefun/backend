# Overview
This repository holds all backend files for the FoodieFun application. You can find it deployed [here](https://foodiefun-api.herokuapp.com/api/).

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

##### 201 (Created)
>If you successfully register a user the endpoint will return an HTTP response with a status code `201` and a body as below.
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
>If you send in a username that does not match one in the database, the endpoint will return an HTTP response with a status code `401` and a body as below.
```
{
    "message": "Wrong credentials"
}
```
----


# REVIEWS ROUTES

## **GET ALL**
## Returns all user reviews

*Method URL* `https://foodiefun-api.herokuapp.com/api/reviews`
*HTTP method:* **[GET]**

### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | Yes       | JWT authorization token |

#### Response

##### 200 (OK)
>If you successfully return the reviews for the user, the endpoint will return an HTTP response with a status code `200` and a body as below.

*example*

```
[
    {
        "id": 1,
        "userId": 1,
        "menuItem": "Carne Asada Tacos",
        "restaurantType": "Mexican",
        "comments": "The meat was a little dry and service was slow, but tasted good overall!",
        "foodRating": 4,
        "waitTime": 30,
        "price": 6.4,
        "photoOfOrder": "https://www.eatingonadime.com/wp-content/uploads/2018/05/easy-street-tacos.jpg",
        "dateOfVisit": "2019-05-06",
        "restaurantName": "Escorpion"
    }
]
```


#### 401 (Unauthorized)
>If you are not logged in or your session has expired, the endpoint will return code `500` and a body as follows:

```
"message": "You are not authorized to perform that operation"
```

---

---
## **ADD REVIEW**
## Add a review for the user


*Method URL* `https://foodiefun-api.herokuapp.com/api/reviews`
*HTTP method:* **[POST]**

### Headers

| name | type   | required | description |
| ----- | ------ | -------- | ----- |
| `Content-Type` | String | Yes | Must be application/json |
| `Authorization`| String | Yes       | JWT authorization token |

#### Body

| name     | type   | required | description              |
| ---------| ------ | -------- | ------------------------ |
| `menuItem`  | String | Yes       |
| `restaurantType`  | String | Yes       |
| `comments`  | String | No       |
| `foodRating`  | integer | Yes       |
| `waitingTime`  | integer | Yes       |
| `price`  | integer | Yes       |
| `photoOfOrder`  | String | No       |
| `dateOfVisit`  | String | Yes       |  Format: `YYYY-MM-DD`
| `restaurantName`  | String | Yes       |

*example:*
```
{
    "menuItem": "Carne Asada Tacos",
    "restaurantType": "Mexican",
    "comments": "The meat was a little dry and service was slow, but tasted good overall!",
    "foodRating": 4,
    "waitTime": 30,
    "price": 6.4,
    "photoOfOrder": "https://www.eatingonadime.com/wp-content/uploads/2018/05/easy-street-tacos.jpg",
    "dateOfVisit": "2019-05-06",
    "restaurantName": "Escorpion"
}
```

#### Response

##### 201 (OK)
>If you successfully createa board, the endpoint will return an HTTP response with a status code `201` and a body as below.

*example*

```
{
    "id": 4,
    "userId": 1,
    "menuItem": "Test",
    "restaurantType": "Test",
    "comments": "This is a test",
    "foodRating": 3,
    "photoOfOrder": "www.google.com/test.jpg",
    "dateOfVisit": "2019-05-21",
    "restaurantName": "Test Restaurant",
    "restaurantInfo": "Test Street 123, Test City"
}
```

#### 400 (incomplete request)
>If your request has insufficient required fields, the endpoint will return code `400` and a body as follows:

```
{ "message": "Missing required parameter" }
```


#### 401 (Unauthorized)
>If you are not logged in or your session has expired, the endpoint will return code `500` and a body as follows:

```
{ "message": "You are not authorized to perform that operation" }
```
