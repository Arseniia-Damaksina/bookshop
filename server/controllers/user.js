import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';

import db from '../models/index.js';

const User = db.users;

const userContollers = {
    register: async (req, res) => {
        try {
            const { email, password, confirmPassword } = req.body;

            // Check if the email already exists
            const userExists = await User.findOne({ where: { email: email } });
            if (userExists) {
                return res.status(400).json({
                    success: false,
                    message: 'The email already exists'
                });
            }

            // Validate email or password
            if (
                !validateEmail(email) ||
                !validatePassword(password) ||
                !matchPasswords(password, confirmPassword)
            ) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid email or password format'
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            await User.create({
                email,
                password: hashedPassword
            });

            return res.status(201).json({
                success: true,
                message: `A new user with email ${email} has been created`
            });
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: 'Registration failed'
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if the user with this email exists
            const emailExists = await User.findOne({ where: { email: email } });
            if (!emailExists) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found. Please sign up first.'
                });
            }

            // Compare passwords
            const passwordsMatch = await bcrypt.compare(
                password,
                emailExists.password
            );

            if (passwordsMatch) {
                // Generate a JWT token
                const token = jwt.sign(
                    { user: emailExists },
                    process.env.TOKEN_SECRET
                );
                res.cookie('id', emailExists.id, {
                    secure: true,
                    sameSite: 'None'
                });
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None'
                });
                return res.status(200).json({
                    success: true,
                    token: token,
                    id: emailExists.id
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect email or password'
                });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, error: 'Login failed' });
        }
    },
    logout: async (req, res) => {
        // Clear cookies
        res.clearCookie('token');
        res.clearCookie('id');
        
        return res.status(200).json({
            success: true,
            message: 'The user is logged out'
        });
    }
};

export default userContollers;
