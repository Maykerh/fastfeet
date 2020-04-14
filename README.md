<div align="center">
    <img src="https://raw.githubusercontent.com/Maykerh/gostackdesafiofinal/master/mobile/src/assets/fastfeet-logo%402x.png" />
</div>

## :computer: Project description

<h4>
   FastFeet is a complete delivery system, that consists in an API, a web application where the company can manage everything related to the orders, and it also have a mobile app that is used by the deliverymans to manage the delivery status 
</h4>

## :floppy_disk: Installation and Execution

First of all, you need to clone the repository

```bash
git clone https://github.com/Maykerh/fastfeet.git
```

Next, you'll need a Postgre database, in this case we will be using <a href="https://www.docker.com/get-started" target="_blank" >
  Docker
</a>. Run the comand below to create a Postgre image

```bash
docker run --name mypostgre -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

And run this command to start a container
```bash
docker start mypostgre
```

### Backend

To start the backend, from the project root, access the backend folder and install the dependencies

```bash
cd backend

yarn install
```

After all the dependencies installed, you need to configure a .env file with your environment variables,  use the .env.example file to fill the variables correctly

If your server is running on localhost, use the machine IP as the APP_URL, if you use "localhost", maybe the images won't load in the mobile app

With the environment variables set, prepare the database with the commands below

```bash
yarn sequelize db:migrate

yarn sequelize db:seed:all
```

And then, start the server

```bash
yarn dev
```

All done, the api should be working now.

### Frontend

To start the frontend, from the project root, access the frontend folder and install the dependencies

```bash
cd frontend

yarn install
```
Edit the file src\services\api.js and change the baseURL to match your server url

```bash
const api = axios.create({
    baseURL: "http://localhost:3333",
});
```

Then, start the server

```bash
yarn start
```

You can use the default admin account to login in the application

```bash
Login: admin@fastfeet.com

Password: 123456
```

### Mobile (Android only)

To start the mobile, from the project root, access the mobile folder and install the dependencies

```bash
cd mobile

yarn install
```

Edit the file src\services\api.js and change the baseURL to match your server url

```bash
const api = axios.create({
    baseURL: "http://192.168.1.0:3333",
});
```

Then connect your device or emulator and start the server 

```bash
react-native run-android
```

