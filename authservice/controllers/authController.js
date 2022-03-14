const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');
const axios = require('axios');
const oauth = require('axios-oauth-client');
const hasha = require('hasha');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');


const signToken = user => {
  return new Promise((resolve, reject) => {
    // User needs to be identified with id
    // We generate the refresh token :
    // we generate a string
    let refreshId = user.id + process.env.JWT_SECRET;
    // We generate salt
    
 
      let refresh_token= hasha('unicorn');
      console.log(refresh_token);

      jwt.sign(
        user,
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 // 30 min in seconds
        },
        (err, jwttoken) => {
          if (err) {
            reject(err);
          }
          resolve([jwttoken, refresh_token]);
        }
      );
    });
  
 
       
};
exports.refresh_token = (req, res) => {
  // The refresh token has been validated by the middle ware before.

  try {
    req.body = req.jwt;
    const userId = req.body._id;

    User.findOne({ _id: userId }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ auth: "Email not found" });
      }
       
      signToken(user.toObject())
        .then(([token, refresh_token]) => {
          res.status(200).json({
            success: true,
            token: "Bearer " + token,
            refresh_token: refresh_token
          });
        })
        .catch(err => {
          return res.status(400).send({ error: "Error", err: err });
        });
    });
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};
const createSendToken = (user, statusCode, res) => {
 
 
  signToken(user.toObject())
  .then(([token, refresh_token]) => {
    res.status(200).json({
      success: true,
      user: user,
      token: "Bearer " + token,
      refresh_token: refresh_token
    });
  })
  .catch(err => {
    return res.status(400).send({ error: "Error", err: err });
  });
 




  // Remove password from output



 
user.password = undefined;


   
};

 


 
 
exports.signupGoogle = catchAsync(async (req, res, next) => {
 
  const _password = crypto.randomBytes(16).toString('hex');
  
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(_password)
    .digest('hex');


  let user = await User.findOne({ email: req.body.user.email })

  if (!user) {
      user = await User.create({
      provider: req.body.user.provider,
      name: req.body.user.firstName,
      email: req.body.user.email,
      password: _password,
      passwordConfirm: _password,
      role: "user"
    });
    const codeInscription = user.createTokenInscription();
    user.active= false;
    user.accountConfirmToken = codeInscription;
 
    const url = `${req.protocol}://${req.get('host')}/api/v1/users/confirm_account/${codeInscription}`;
    console.log(url);
    await user.save({ validateBeforeSave: false });
    await new Email(user, url).sendWelcome();
  }
  console.log(user);
  //newuser
  createSendToken(user, 201, res);
 

 
   
 
 
    
  
 
});


exports.login = catchAsync(async (req, res, next) => {

   console.log(req.body);
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    console.log("Please provide email and password!");
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.clearCookie('connect.sid');
  res.clearCookie('jwt');
    res.status(200).json( {status: "s"});
 
    
   
  
};

 

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.jwt.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  console.log(resetToken);
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});


exports.confirmAccount = catchAsync(async (req, res, next) => {
  const token = req.params['token'];
  console.log(token);
  const user = await User.findOne({ accountConfirmToken: token });
  if(!user)
  return next(
    new AppError('Token is invalid or has expired'),
    500
  );
  else
  {
    user.active = true;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  }



});
exports.emailSignup = catchAsync(async (req, res, next) => {

  req.body.provider="email";
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(new AppError('There is a user with this email address.', 500));
  }
  const newUser = await User.create(req.body);
  const codeInscription = newUser.createTokenInscription();
  newUser.active= false;
  newUser.accountConfirmToken = codeInscription;
  await newUser.save({ validateBeforeSave: false });

  await new Email(newUser, codeInscription).confirmInscription();
  console.log(codeInscription);
  createSendToken(newUser, 201, res);
  // console.log(url);
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = req.params['token'];


  const user = await User.findOne({
    passwordResetToken: hashedToken,
   
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
 
  // 1) Get user from collection
  const user = await User.findById(req.jwt._id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
