# General Information

Spigot case study project.

# Technologies Used
### Client-side
- HTML
- CSS
- ReactJS
- TypeScript

### API side (server)
- NodeJS
- ExpressJS
- MongoDB
- JavaScript

# Local Setup
## Requirements
- NodeJS 
- Create a MongoDB database following [these steps](https://www.mongodb.com/basics/create-database#option-1).

*NOTE:* Changes might be needed to the function handling the connection to the MongoDB. Check **api/utils.js** line #5

To run this project locally follow these instructions:

### API side (server) setup
1. Go to the */api* directory using `> cd api`
2. Install all dependencies by running `yarn install`
3. Create a **.env** file and follow the **.env.sample** file to set the needed env variables.
4. Initiate the API dev server by running `yarn dev` 

After these steps, your server should be running using port 4000.

*NOTE:* if you want to use a different port you will need to change the line #2 from **/client/src/common/constant.ts** file

### Client-side setup
1. Go to the *client* folder using `> cd client`
2. Install all dependencies by running `yarn install`
3. Initiate the react application running `yarn dev` 

After these steps, your application should be running on http://localhost:5173

*NOTE:* if your React App initializes using a different port, you will need to change the port information on line #24 from **/api/index.js** file. This is needed to avoid CORS issues.

# Improvements
- Validations on forms.
- Styles (It may be better to pick a CSS Library like TailwindJS)
- Improve UX by adding error handling and notifications.
- Server refactorizations.
- Etc.
