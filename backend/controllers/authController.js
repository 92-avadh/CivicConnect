import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';
import OfficialModel from '../models/officialModel.js';

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

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
            user: { id: user._id, email: user.email },
        });
    } catch (error) {
        console.error("Error in User Registration:", error);
        res.status(500).send({ success: false, message: 'Error in user registration', error });
    }
};

export const registerOfficialController = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, employeeId, department, password } = req.body;
        if (!firstName || !lastName || !email || !phone || !employeeId || !department || !password) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const existingOfficial = await OfficialModel.findOne({ $or: [{ email }, { employeeId }] });
        if (existingOfficial) {
            return res.status(400).send({ success: false, message: 'Official already registered with this email or employee ID' });
        }
        const hashedPassword = await hashPassword(password);
        const official = await new OfficialModel({ ...req.body, password: hashedPassword }).save();
        res.status(201).send({
            success: true,
            message: 'Official registered successfully',
            official: { id: official._id, email: official.email },
        });
    } catch (error) {
        console.error("Error in Official Registration:", error);
        res.status(500).send({ success: false, message: 'Error in official registration', error });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ success: false, message: 'Invalid email or password' });
        }
        let account = await UserModel.findOne({ email }) || await OfficialModel.findOne({ email });
        if (!account) {
            return res.status(404).send({ success: false, message: 'Email is not registered' });
        }
        const match = await comparePassword(password, account.password);
        if (!match) {
            return res.status(400).send({ success: false, message: 'Invalid password' });
        }
        const role = account.employeeId ? 'official' : 'user';
        const token = jwt.sign({ _id: account._id, role: role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                id: account._id,
                name: `${account.firstName} ${account.lastName}`,
                email: account.email,
                phone: account.phone, 
                role: role
            },
            token,
        });
    } catch (error) {
        console.error("Error in Login:", error);
        res.status(500).send({ success: false, message: 'Error in login', error });
    }
};
