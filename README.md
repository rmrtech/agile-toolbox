# *<img width="64" height="64" src="./src/assets/images/agiletoolbox-logo.svg">* agile-toolbox


### *Tools for agile ceremonies*
#### Project installation and setup
The project uses firebase realtime database. So to use this app you need to set up a firebase project and create a firebase realtime database instance.  
You can follow below links to set up the project and database.  

https://firebase.google.com/docs/web/setup?authuser=0

https://firebase.google.com/docs/database/web/start?authuser=0

Add below to your database rules in firebase
```json
{
  "rules": {
    "sessions": {
      ".read": "auth != null",
      ".write": "auth != null",
    },
    "userActiveSession":{
      ".read": "auth != null",
      ".write": "auth != null",
    },
    "users":{
      ".read": "auth != null",
      "$uid": {
        ".write": "$uid === auth.uid"
      },
    }
  }
}
```

After firebase setup update or replace your configuration to the `firebaseConfig` object inside the db-init.js file. Also configure the database url against `databaseURL`

```javascript
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxx",
  databaseURL: "https://xxxxxxxxxxxxxxxxx",
};

```

You can now run `npm install` from the root of the agile-toolbox directory.  
Build you project by running command `npm run build`
To preview the application run `npm run serve`

After build a `dist` folder is created under root directory with all the deployables.
The content inside the dist folder can be used to host the application in your private datacenter or cloud.

If you want to host the application in firebase follow below links.

https://firebase.google.com/docs/hosting/quickstart?authuser=0

https://vitejs.dev/guide/static-deploy.html#google-firebase
