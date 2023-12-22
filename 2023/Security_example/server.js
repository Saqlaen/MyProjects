require('dotenv').config(); // no need to assign it to a constant because will are only goin to be calling the config() function 
const express = require("express");
const helmet = require("helmet");
const passport = require('passport');
const { Strategy} = require("passport-google-oauth20");
const cookieSession = require('cookie-session');

const fs = require("fs");
const path = require("path");
const https = require("https");

const PORT = 3000;
const app = express();

const config = {
   CLIENT_ID: process.env.CLIENT_ID,
   CLIENT_SECRET: process.env.CLIENT_SECRET,
   COOKIE_KEY1: process.env.COOKIE_KEY1,
   COOKIE_KEY2: process.env.COOKIE_KEY2, // new session's are signed with this signature
};

const AUTH_OPTIONS = {
   clientID: config.CLIENT_ID,
   clientSecret: config.CLIENT_SECRET,
   callbackURL: "/auth/google/callback",
};

function verifyCallback( accessToken, refreshToken, profile, done ){
    // you can add that user to your db or stuff like that here
    console.log( 'Google Profile', profile );
    done( null, profile );
}

passport.use( new Strategy(AUTH_OPTIONS, verifyCallback ));

// passport has two other function that serialize and decerialize the data 
passport.serializeUser( ( user, done) => {
    done( null, user.id );
});

passport.deserializeUser( ( id, done ) => { 
    // will set the express's req.user which we can use
    done( null, id );
});

// ADDING SECURITY MIDDLEWARE FOR OUR REQUEST
app.use( helmet() );

 // configuring our cookie middlware
 // keys [ parameter ] -> this is list of secret value's used to keep your cookie's secure specifically by signing your cookie so server know's what the cookies contain 
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY1, config.COOKIE_KEY2], // these values should never be made public
  })
);


// TO AUTHENTICATE THE GOOGLE AUTH
// initialize() function set's up the passport session 
app.use( passport.initialize() );
// authenticates our session's
app.use( passport.session() ); // will set request.user property in express

app.use(express.json());

 //MIDDLEWARE to check if the user is logged in
function checkLoggedIn(req, res, next) {
    // check if user is logged in
    const isLoggedIn = req.isAuthenticated() && req.user; // passport give us a function that can validate if the user was found in the session
    if( !isLoggedIn ){
        return res.status(401).json( {
            error: 'You must log in!!'
        } );
    }
    next();
};

 // we can pass middleware for a specific route this is how we handle authorization in express
// will start the enire google flow
app.get( "/auth/google",
   // PASSPORT HAS A MIDDLEWARE TO HANDLE THIS
   passport.authenticate( 'google', {
    scope: [ 'email', 'profile' ]
   }),
   (req, res) => {
    console.log( 'kicked off the google OAuth flow')
   }
);

app.get( '/auth/google/callback', 
          // PASSPORT AUTHENTICATOR MIDDLEWARE
          passport.authenticate('google',
          {
            failureRedirect: '/failure',
            successRedirect: '/',
            // session: false, by default it's true
          }), 
          ( req, res) => {
                            console.log( 'google called us back')
                         } 
);

 app.get( '/auth/logout' , ( req, res ) => {
    req.logout(); // removes req.user and clears any logged in session
    return res.redirect("/");
 });

 app.get( '/failure', (req, res) => {
    res.send( 'failed to log in!!!' );
 })

 app.get("/secret", checkLoggedIn ,(req, res) => {
   return res.send("your secret thing!!!");
 });

 app.get("/", (req, res) => {
    console.log( req.url )
   res.sendFile(path.join(__dirname, "Public", "index.html"));
 });





 // we can send our ssl certificate in createSwerver( { your certificate })
 https
   .createServer(
     {
       key: fs.readFileSync("key.pem"), // you will get an error PEM_NO_START_LINE if you don't load those files before passing them as options
       cert: fs.readFileSync("cert.pem"),
     },
     app // request listener our express application
   )
   .listen(PORT, () => {
     console.log("listening on port " + PORT + "...");
   }); 