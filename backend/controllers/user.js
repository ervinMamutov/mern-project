import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';

const userControllers = {
  // @desc Register new  user
  // @route POST /api/user
  // @access Public
  register: async (req, res) => {
    try {
      const { name, email, password, rePassword } = req.body;

      const isValidEmail = validateEmail(email);
      const isValidPassword = validatePassword(password);
      const isMatchPassword = matchPasswords(password, rePassword);

      if (!name || !isValidEmail || !isValidPassword || !isMatchPassword) {
        return res.status(400).json({
          success: false,
          message: 'Please, add all a fills'
        });
      }

      // Check userExist
      const userExist = await User.findOne({ email });

      if (userExist) {
        return res.status(400).json({
          success: false,
          message: 'User already exist'
        });
      } else {
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //create user

        const user = User.create({
          name: name,
          email: email,
          password: hashPassword
        });

        return res.status(201).json({
          success: true,
          message: 'Register User'
        });
      }
    } catch (err) {
      err: err.message || 'User not create';
    }
  },

  // @desc Authenticate a new user
  // @route POST /api/user/login
  // @access Public
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userExist = await User.findOne({ email });

      const isValidPassword = await bcrypt.compare(
        password,
        userExist.password
      );
      // console.log(isValidPassword);

      if (userExist && isValidPassword) {
        const token = jwt.sign(
          { userExist: userExist },
          process.env.TOKEN_ACCESS_SECRET
        );

        res.cookie('_id', userExist._id, {
          secure: true,
          sameSite: false
        });

        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          sameSite: false
        });

        return res.status(201).json({
          success: true,
          message: `The user at ${email} has successfully logged in`,
          token,
          id: userExist._id
        });
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        err: err.message || 'User not create'
      });
    }
  },

  // @desc Authenticate a new user
  // @route POST /api/user/login
  // @access Private
  getMe: async (req, res) => {
    const { id } = req.params;
    const { name, email } = await User.findById(id);

    res.status(200).json({
      id: id,
      name,
      email
    });
  },
  // @desc
  logout: async (req, res) => {
    res.clearCookie('token');
    res.clearCookie('id');

    return res.status(200).json({
      success: true,
      message: 'Session finished successfully'
    });
  }
};

export default userControllers;
