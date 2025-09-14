
const passport=require('passport');
const dotenv=require('dotenv')
const mysql=require('mysql2');
const path=require('path');
const Google_Strategy =require('passport-google-oauth2').Strategy

dotenv.config({
    path:path.resolve(__dirname,'./.env')
}
);

const db=mysql.createConnection({
    
    user      :process.env.db_user,
    password  :process.env.db_password,
    host      :process.env.db_host,
    database  :process.env.db_name ,
  
});


passport.serializeUser(function (user,done){
    done(null,user)
})
passport.deserializeUser(function (user,done){
    done(null,user)
})


passport.use(new Google_Strategy({
    clientID:process.env.clinet_id,
    clientSecret:process.env.client_secret,
    callbackURL:process.env.callback_url,
    passReqToCallback:true
}, function(req,accessToken,refreshToken,profile,done ) {
    console.log(profile);
    return done(null,profile);
}))


