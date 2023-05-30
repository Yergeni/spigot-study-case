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

_NOTE:_ Changes might be needed to the function handling the connection to the MongoDB. Check **/api/utils.js** [line #5](https://github.com/Yergeni/spigot-study-case/blob/fd7cef7daa41783226b8949febf8706d3f5f70ab/api/utils.js#L5)

To run this project locally follow these instructions:

### API side (server) setup

1. Go to the _/api_ directory using `> cd api`
2. Install all dependencies by running `yarn install`
3. Create a **.env** file and follow the **.env.sample** file to set the needed env variables.
4. Initiate the API dev server by running `yarn dev`

After these steps, your server should be running using port 4000.

_NOTE:_ if you want to use a different port you will need to change the [line #2](https://github.com/Yergeni/spigot-study-case/blob/fd7cef7daa41783226b8949febf8706d3f5f70ab/client/src/common/constants.ts#L2) from **/client/src/common/constant.ts** file

### Client-side setup

1. Go to the _client_ folder using `> cd client`
2. Install all dependencies by running `yarn install`
3. Initiate the react application running `yarn dev`

After these steps, your application should be running on http://localhost:5173

_NOTE:_ if your React App initializes using a different port, you will need to change the port information on [line #24](https://github.com/Yergeni/spigot-study-case/blob/fd7cef7daa41783226b8949febf8706d3f5f70ab/api/index.js#L24) from **/api/index.js** file. This is needed to avoid CORS issues.

# Improvements

- Add Validations on forms.
- Styles (It may be helpful to pick a CSS Library like TailwindCSS)
- Add a user profile page with logic to modify the user information and show post related to them.
- ~~Improve featured CSS by using a banner idea.~~ <span style="color: green; font-weight: bold">DONE</span>
- Improve UX by adding better error handling and notifications.
- Add Like, add to favorite, comments, and other features.
- Server refactorizations.
