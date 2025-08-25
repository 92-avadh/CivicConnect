import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import OfficialModel from '../models/officialModel.js';

// 🔹 Helpers
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

// ------------------ CITIZEN ------------------

// Citizen Registration
export const registerUserController = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        if (!firstName || !lastName || !email || !phone || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ success: false, message: 'User already registered with this email' });
        }

        const hashedPassword = await hashPassword(password);
        const user = await new UserModel({ ...req.body, password: hashedPassword }).save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user: { _id: user._id, email: user.email },
        });
    } catch (error) {
        console.error("Error in User Registration:", error);
        res.status(500).send({ success: false, message: 'Error in user registration', error });
    }
};

// Citizen Login
export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ success: false, message: 'Invalid email or password' });
        }

        const account = await UserModel.findOne({ email });
        if (!account) {
            return res.status(404).send({ success: false, message: 'Email is not registered' });
        }

        const match = await comparePassword(password, account.password);
        if (!match) {
            return res.status(400).send({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ _id: account._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                _id: account._id,
                name: `${account.firstName} ${account.lastName}`,
                email: account.email,
                phone: account.phone,
                role: 'user'
            },
            token,
        });
    } catch (error) {
        console.error("Error in Citizen Login:", error);
        res.status(500).send({ success: false, message: 'Error in login', error });
    }
};

// ------------------ OFFICIAL ------------------

// Official Login (ONLY)
export const loginOfficialController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ success: false, message: 'Invalid email or password' });
        }

        const official = await OfficialModel.findOne({ email });
        if (!official) {
            return res.status(404).send({ success: false, message: 'No official found with this email' });
        }

        const match = await comparePassword(password, official.password);
        if (!match) {
            return res.status(400).send({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ _id: official._id, role: 'official' }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                _id: official._id,
                name: `${official.firstName} ${official.lastName}`,
                email: official.email,
                phone: official.phone,
                employeeId: official.employeeId,
                departmentId: official.departmentId,
                role: 'official'
            },
            token,
        });
    } catch (error) {
        console.error("Error in Official Login:", error);
        res.status(500).send({ success: false, message: 'Error in login', error });
    }
};
