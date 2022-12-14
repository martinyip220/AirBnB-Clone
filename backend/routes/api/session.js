const express = require("express");
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, ReviewImage, SpotImage, Booking, Sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op } = require("sequelize");


const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Log in
router.post(
  '/',
  // validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    const validationErr = {
      message: "Validation Error",
      statusCode: 400,
      errors: {},
    }

    if (!credential) {
      validationErr.errors.credential = "Email or username is required";
    }
    if (!password) {
      validationErr.errors.password = "Password is required";
    }

    if (!credential || !password) {
      res.status(400);
      return res.json(validationErr)
    }

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({user: user})
  }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

// Restore session user
router.get(
  '/',
  // requireAuth,
  restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        const restoreOldUser = user.toSafeObject();
        return res.json({"users": restoreOldUser});
      } else return res.json({ user: null });
    }
  );

module.exports = router;
