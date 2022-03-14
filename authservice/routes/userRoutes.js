const express = require('express');
const userController = require('./../controllers/userController');
const AuthController = require('./../controllers/authController');
const router = express.Router();
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel');
const AuthMiddleware = require("./../middlewares/auth.middleware");
//router.post('/signup', authController.signup);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

 
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET
  },
   function (jwtPayload, done) {

    console.log(jwtPayload);
     return User.findById(jwtPayload.user._id)
     .then(user => 
     {
       return done(null, user);
     }
   ).catch(err => 
   {
     return done(err);
   });
  }
  ))
 
  checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next() }
    res.redirect("/login")
  }

 passport.use(new GoogleStrategy({
  clientID: "206839759126-4fi5aq1gngv3grhic38u46l7f8kviot6.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:4112/api/v1/users/googleRedirect"
},
function(accessToken, refreshToken, profile, cb) {
    //console.log(accessToken, refreshToken, profile)
    console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
    return cb(null, profile)
}
)); 

/*passport.use(new FacebookStrategy({
    clientID: '378915159425595',//process.env['FACEBOOK_CLIENT_ID'],
    clientSecret: '7bd791932eaf12fbb75d0166721c0e02',//process.env['FACEBOOK_CLIENT_SECRET'],
    callbackURL: "http://localhost:5000/facebookRedirect", // relative or absolute path
    profileFields: ['id', 'displayName', 'email', 'picture']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
    console.log("FACEBOOK BASED OAUTH VALIDATION GETTING CALLED")
    return cb(null, profile);
  }));*/

router.get('/auth/email', (req, res)=>{
    res.sendFile('login_form.html',  {root: __dirname+'/public'})
})
 
router.get('/auth/google')
router.get('/auth/facebook')
router.post('/googleSignup', AuthController.signupGoogle);
router.get('/confirm_account/:token', AuthController.confirmAccount);
router.post('/auth/email', AuthController.login)
router.post('/signup', AuthController.emailSignup);
// Protect all routes after this middleware
router.post("/refresh", [
  AuthMiddleware.JwtNeeded,
  AuthMiddleware.verifyRefreshBodyField,
  AuthMiddleware.validRefreshNeeded,
  AuthController.refresh_token
]);

 

function CheckUser(input){
    console.log(DATA)
    console.log(input)
  
    for (var i in DATA) {
        if(input.email==DATA[i].email && (input.password==DATA[i].password || DATA[i].provider==input.provider))
        {
            console.log('User found in DATA')
            return true
        }
        else
         null
            //console.log('no match')
      }
    return false
}

router.post('/forgotPassword', AuthController.forgotPassword);
router.patch('/resetPassword/:token', AuthController.resetPassword);

router.use(AuthMiddleware.JwtNeeded,AuthMiddleware.validJWTNeeded, AuthController.restrictTo('user'));

router.patch('/updateMyPassword', AuthController.updatePassword);
router.get('/me',  AuthMiddleware.JwtNeeded, userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);



router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
