# node-crud-api
🦍  A CRUD( Create, Read, Update and Delete) application built with js NodeJs and Express using the NoSQL database MongoDB 🦍

## How run? 👨‍💻

### Requirements:

1. [Visual Studio Code](https://code.visualstudio.com/) or other JavaScript IDE
2. [NodeJS](https://nodejs.org/)
3. [MongoDB](https://docs.mongodb.com/manual/installation/)

<sup>You need to have these technologies installed before attempting to run the project</sup>

First, install the dependencies using the terminal by typing `npm install`

Now just run `npm run dev`, and that's it, the application will already be running on your machine in http://localhost:3000.

*To test the routes, I recommend [Insomnia](https://insomnia.rest/), currently my favorite API Client, another option to use is [Postman](https://www.postman.com/), if you prefer.*

Below, the API routes implemented to date will be listed👇

## Routes 🌲

- ### **/auth**
  - POST **/register**: Here you can register users;
  
    ```json
    //Request body example
      {
         "email": "example@gmail.com",
         "password": "123456789",
         "name":"Edvan Matos"
       }
    ```
  - POST **/authenticate**: Here you can authenticate a user;

    ```json
    //Request body example
      {
         "email": "example@gmail.com",
         "password": "123456789",
         "name":"Edvan Matos"
       }
    ```
  - POST **/forgot-password**: Here you can generate a token for reset password;

    ```json
    //Request body example
      {
         "email": "example@gmail.com",
       }
    ```
  - POST **/reset-password**: Here you can reset a user password;

    ```json
    //Request body example
      {
         "email": "example@gmail.com",
         "newPassword": "12345",
	       "token": "c79e37f13212aef7485830ecd13fc03cb6ef36de"
      }
    ```
- ### **/projects**
  - GET **/reset-password**: Here you can get a user sending an authorization token via cookies header;

     ```json
     //Request response example
      {
        "user": {
          "_id": "605b9ae00942275c991eb815",
          "email": "edvan.stt02@gmail.com",
          "name": "Edvan",
          "createAt": "2021-03-24T20:02:40.520Z",
        }
      }
    ```


