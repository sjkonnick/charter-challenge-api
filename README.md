

Charter Challenge API
======================

Charter Challenge API is the Node backend for the restaurant finder table application.  It is responsible for parsing and serving the restaurant data to the application through the /restaurants endpoint as well as server rendering the app.  


## Installation 

Run the following command to install the npm packages:

`npm install`

## Running the server locally

Execute the following command to start the api on port 3001.

`node src/server.js`

## Deployed API on AWS

The API has been dockerized and deployed to Amazon ECR.  The cluster is running 1 t2.micro EC2 instance currently on the AWS free tier.  It can be accessed at the following URL:

[http://18.217.153.74/](http://18.217.153.74/)

## Getting restaurant data

The React application currently handles retrieving and filtering all restaurant data through a GET request to the /restaurants endpoint.  The application provides several query parameters, so the API will expect to see all of the following set to an appropriate value.

* page: number
* state: string (abbreviated state format)
* search: string
* genre: string (one of genres supplied in data)
* attire: string (one of attires supplied in data)
* nameSort: string (ASC / DESC / OFF)
* stateSort: string (ASC / DESC / OFF)

A sample full request might look like the following:

GET  /restaurants?page=1&search=test&state=CO&genre=Irish&attire=casual&nameSort=ASC&stateSort=OFF

## CI/CD

The repository uses GitHub Actions to automate the process of deploying the new image to ECR as well as updating the task definition running in the ECS service.  Upon committing to the master branch, GitHub Actions will automatically proceed to deploy the new build to ECS.

