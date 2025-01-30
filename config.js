var admin = require("firebase-admin");

/* This line of code is importing the contents of the "opServiceAccount.json" file into the variable
`serviceAccount`. The contents of the JSON file are typically used for authentication and
authorization purposes, such as providing credentials for accessing a service like Firebase. */
var serviceAccount = require("./opServiceAccount.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mouse-lumi.firebaseio.com"
})

module.exports.admin = admin