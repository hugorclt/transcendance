# Transcendance
A project designed to create an SPA (single page applications) where you can play pong with your friends!
The technical requirements are the following:
* Use a **Typescript framework** for the front-end
* Use **NestJS** for the back-end
* Use **PostGres** for the database



## Dev Environment

We use Docker to **containerize** our application and Docker-Compose to link all the services together. We have three container, one for the front-end running ReactJs, one for the back-end running Nest and last but not least one for the database running PostGres.

* ReactJs run on the port 3000 and expose it's port on the Host port **3002** you can access the front at the url: ```localhost:3002```
* NestJs run on the port 3000 and expose it's port on the Host port **8000** you can access the back at the url: ```localhost::8000```
* PostGres run on the port 5432 and expose it's port on the Host port **3001**

In all the container they have a volumes that contain the source code of their respective services, that permit to modify the code directly in the Host volume without having to log into the container and modify the code in here, or recreate the container at every changes! 

[x] Front-end setup and working, with Hot reloading<br/> 
[x] Back-end setup and working, with Hot reloading <br/> 
[ ] Database setup and working<br/> 

We don't want to share the password of the database so i made a .env file that is not in this repository!

Don't forget to set node_modules in the git_ignore because we don't want to have this folder on the repository, if this folder is missing the container use the command ```npm install``` to download all missing package from the ```package.json``` file.

### Front-end

In order to create the front-end you have first to create a react-app

```npx create-react-app name_of_the_app --template typescript```

I used ```--template typescript``` to set the project in typescript by default. I used docker-compose to make a volume linking the newly created folder with the interior of the front-end container.

### Back-end

In order to create the back-end you have first to create a nest app

```nest new name_of_the_app```


### Database


---

made with 💜 by mlaouedj, dsaada and hrecolet!