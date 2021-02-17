## Overview

An administrative portal to manage users and events. The user datas are displayed on a table, and events datas are displayed on cards organized by years. Users and events datas are added by filling a form.

Check the deployed project [here](https://portal-adm.vercel.app/)


## Built With

* [Create React App](https://github.com/facebook/create-react-app)
* React Router
* React Hooks
* React Redux
* Redux Saga
* SASS
* FullCalendar
* Firebase

## Starting the project

Clone the repository:

`https://github.com/ammtsz/portal-adm.git`

Change directory:

`cd portal-adm`

In the project directory, run:

`npm install`

`npm start`

It will run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).



## Firebase

This project is integrated with Firebase. To integrate it to your Firebase account:

1. Create an account
2. Go to console
3. Click on 'Add project'
4. Create your project
5. Add an App (select 'Web' option)
6. Register your web app

Once it is done, you will have a `firebaseConfig`. Copy those datas and replace it on the project. Go to `./src/firebase/firebase.utils.js` and replace it on:

```javascript
const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

```

The project uses 'Authentication' and 'Cloud Firestore' from Firebase, so you need to 'Get started' with Authentication and 'Create database' on Cloud Firestore.


## Dependencies
```
    "@fullcalendar/core": "^5.3.1",
    "@fullcalendar/daygrid": "^5.3.2",
    "@fullcalendar/google-calendar": "^5.3.1",
    "@fullcalendar/react": "^5.3.1",
    "axios": "^0.21.1",
    "firebase": "^7.22.0",
    "node-sass": "^4.14.1",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-redux": "^7.2.2",
    "react-router-dom": "^5.2.0",
    "react-scripts": "^4.0.0",
    "redux": "^4.0.5",
    "redux-logger": "^3.0.6",
    "redux-saga": "^1.1.3",
    "redux-saga-firebase": "^0.15.0",
    "redux-thunk": "^2.3.0",
    "reselect": "^4.0.0"
```

## Funcionalities
- Email and password authentication using Firebase

* Users
  * Public and private forms to add a new user
  * New users' datas go to a separeted database (and displayed in a different table) until its register is approved by the admin
  * Sort option for columns datas
  * Filter for table columns
  * Filter for active users
  * Search input for users
  * Internal notes for each user
  * Delete and Edit user datas
  
* Events
  *  Private form to add a new event
  *  Photo attached to the event
  *  One card for each event
  *  All information about the event displayed in the card
  *  Cards groupped by year and sorted by most recent event
  *  Upcoming events displayed on top of the page
  *  A callendar to be managed from a google calendar







