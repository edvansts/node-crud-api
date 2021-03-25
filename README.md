# node-crud-api
🦍  A CRUD( Create, Read, Update and Delete) application built with js NodeJs and ExpressJs using the NoSQL database MongoDB 🦍

## How run? 👨‍💻

### Requirements:

1. [Visual Studio Code](https://code.visualstudio.com/) or other JavaScript IDE
2. [NodeJS](https://nodejs.org/)
3. [MongoDB](https://docs.mongodb.com/manual/installation/)

<sup>You need to have these technologies installed before attempting to run the project</sup>

First, install the dependencies using the terminal by typing `npm install`

Now just run `npm run dev`, and that's it, the application will already be running on your machine in http://localhost:3000.

*To test the routes, I recommend [Insomnia](https://insomnia.rest/), currently my favorite API Client tool, another option to use is [Postman](https://www.postman.com/), if you prefer.*

Below, the API routes implemented to date will be listed👇

## Routes 🌲

- ### **/auth**
  - POST **/register** : Here you can register users;
  
    ```json
    //Request body example
      {
         "email": "example@gmail.com",
         "password": "123456789",
         "name":"Edvan Matos"
       }
    ```
  - POST **/authenticate** : Here you can authenticate a user, generating a token for him;

    ```json
    //Request body example
      {
         "email": "example@gmail.com",
         "password": "123456789",
         "name":"Edvan Matos"
       }
    ```
  - POST **/forgot-password** : Here you can generate a token for reset password;

    ```json
    //Request body example
      {
         "email": "example@gmail.com",
       }
    ```
  - POST **/reset-password** : Here you can reset a user password;

    ```json
    //Request body example
      {
         "email": "example@gmail.com",
         "newPassword": "12345",
	 "token": "c79e37f13212aef7485830ecd13fc03cb6ef36de"
      }
    ```
- ### **/projects** *All requests in project router have authentication, send a authorization token through cookies header*
  - GET **/** : Here you can get an array of your user projects; 
    ```json
    //Response example
    {
	"projects": [
	    {
	      "tasks": [
		"605ca1f169eef12f3d782ce3",
		"605ca1f169eef12f3d782ce4"
	      ],
	      "_id": "605ca0146cdc4f2d5b428118",
	      "title": "Project1",
	      "description": "Now you'll be a rockstar",
	      "createdAt": "2021-03-25T14:37:08.597Z",
	      "user": {
		"_id": "605c915ea9d68f2041366054",
		"email": "example@gmail.com",
		"name": "Edvan Matos",
		"createdAt": "2021-03-25T13:34:22.015Z",
	      },
	    },
	    {
	      "tasks": [
		"605ca1f169eef12f3d782ce3",
		"605ca1f169eef12f3d782ce4"
	      ],
	      "_id": "605ca0146cdc4f2d5b428118",
	      "title": "Project2",
	      "description": "In this project you'll make a history",
	      "createdAt": "2021-03-25T14:37:08.597Z",
	      "user": {
		"_id": "605c915ea9d68f2041366054",
		"email": "example@gmail.com",
		"name": "Edvan Matos",
		"createdAt": "2021-03-25T13:34:22.015Z",
	      },
	    }
	 ]
     }
    ```
  - GET **/:projectId** : Here you can get an especific project of your user;
    ```json
    //Response example
	{
	  "project": {
	    "tasks": [
	      {
		"_id": "605ca1f169eef12f3d782ce3",
		"title": "Second task",
		"description": "Go exercise in https://mova-se.ga 🤓"
		"project": "605ca0146cdc4f2d5b428118",
		"user": "605c915ea9d68f2041366054",
		"createdAt": "2021-03-25T14:45:05.007Z",
	      },
	      {
		"_id": "605ca1f169eef12f3d782ce4",
		"title": "MakeFirst",
		"description": "I need to be a normal people",
		"project": "605ca0146cdc4f2d5b428118",
		"user": "605c915ea9d68f2041366054",
		"createdAt": "2021-03-25T14:45:05.011Z",
	      }
	    ],
	    "_id": "605ca0146cdc4f2d5b428118",
	    "title": "Project2",
	    "description": "In this project you'll make a history",
	    "createdAt": "2021-03-25T14:37:08.597Z",
	    "user": {
	      "_id": "605c915ea9d68f2041366054",
	      "email": "edvan.stt02@gmail.com",
	      "name": "Edvan Matos",
	      "createdAt": "2021-03-25T13:34:22.015Z",
	    },
	  }
    }
    ```
  - POST **/** : Here you can create a project;
    ```json
    //Request body example
    {
	"title": "Project2",
	"description": "Making history",
	"tasks": [
		{
			"title": "MakeFirst",
			"description": "I need to be a normal people"
		},
		{
			"title": "Second task",
			"description": "Go exercise in https://mova-se.ga 🤓"
		}
	]
    }
    ```
  - PUT **/:projectId** : Here you can update a project;
    ```json
    //Request body example
    {
	"title": "Project2NewName",
	"description": "Making history and updating him",
	"tasks": [
		{
			"title": "Tenth task",
			"description": "I need to update and make more historys"
		},
	]
    }
    ```
  - DELETE **/:projectId** : Here you can delete a project, it will return the deleted project);
    ```json
    //Response example
	{
	  "project": {
	    "tasks": [
	    	"605ca1f169eef12f3d782ce3", 
		"605ca0146cdc4f2d5b428118",
	    ],  
	    "_id": "605ca0146cdc4f2d5b428118",
	    "title": "Project2",
	    "description": "In this project you'll make a history",
	    "createdAt": "2021-03-25T14:37:08.597Z",
	    "user": {
	      "_id": "605c915ea9d68f2041366054",
	      "email": "edvan.stt02@gmail.com",
	      "name": "Edvan Matos",
	      "createdAt": "2021-03-25T13:34:22.015Z",
	    },
	  }
    }
    ```




