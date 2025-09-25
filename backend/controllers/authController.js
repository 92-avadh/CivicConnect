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
        console.error("Error in Citizen Registration API:", error);
        res.status(500).send({ success: false, message: 'Error in Citizen Registration API', error });
    }
};

// Citizen Login
export const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ success: false, message: 'Email and password are required' });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                phone: user.phone,
                role: 'user',
            },
        });
    } catch (error) {
        console.error("Error in Citizen Login API:", error);
        res.status(500).send({ success: false, message: 'Error in Citizen Login API', error });
    }
};

// ------------------ OFFICIAL ------------------

// Official Registration
export const registerOfficialController = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, employeeId, departmentId } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !employeeId || !departmentId) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const existingOfficial = await OfficialModel.findOne({ $or: [{ email }, { employeeId }] });
    if (existingOfficial) {
      return res.status(409).send({
        success: false,
        message: "Email or Employee ID is already registered",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newOfficial = new OfficialModel({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      employeeId,
      departmentId,
    });
    await newOfficial.save();

    res.status(201).send({
      success: true,
      message: "Official registered successfully",
    });
  } catch (error) {
    console.error("Error in Register Official API:", error);
    res.status(500).send({
      success: false,
      message: "Error in Register Official API",
      error: error.message,
    });
  }
};

// Official Login (Corrected Version)
export const loginOfficialController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ success: false, message: 'Email and password are required' });
        }

        const official = await OfficialModel.findOne({ email });
        if (!official) {
            return res.status(404).send({ success: false, message: 'Official not found' });
        }

        const isMatch = await comparePassword(password, official.password);
        if (!isMatch) {
            return res.status(401).send({ success: false, message: 'Invalid credentials' });
        }

        // 👇 THE FIX: Added 'role: "official"' to the token payload
        const token = jwt.sign({ _id: official._id, role: 'official' }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: 'Login successful',
            token,
            user: {
                _id: official._id,
                name: `${official.firstName} ${official.lastName}`,
                email: official.email,
                phone: official.phone,
                employeeId: official.employeeId,
                departmentId: official.departmentId,
                role: 'official',
            },
        });
    } catch (error) {
        console.error("Error in Official Login API:", error);
        res.status(500).send({ success: false, message: 'Error in Official Login API', error });
    }
};

// ------------------ PROFILE ------------------
export const updateProfileController = async (req, res) => {
    try {
        const { _id, role } = req.user;
        const { firstName, lastName } = req.body;

        let updatedAccount;
        let userPayload;

        if (role === 'official') {
            updatedAccount = await OfficialModel.findByIdAndUpdate(
                _id,
                { firstName, lastName },
                { new: true }
            );
            userPayload = {
                _id: updatedAccount._id,
                name: `${updatedAccount.firstName} ${updatedAccount.lastName}`,
                email: updatedAccount.email,
                phone: updatedAccount.phone,
                employeeId: updatedAccount.employeeId,
                departmentId: updatedAccount.departmentId,
                role: 'official'
            };
        } else {
            updatedAccount = await UserModel.findByIdAndUpdate(
                _id,
                { firstName, lastName },
                { new: true }
            );
            userPayload = {
                _id: updatedAccount._id,
                name: `${updatedAccount.firstName} ${updatedAccount.lastName}`,
                email: updatedAccount.email,
                phone: updatedAccount.phone,
                role: 'user'
            };
        }

        if (!updatedAccount) {
            return res.status(404).send({ success: false, message: 'User not found.' });
        }

        res.status(200).send({
            success: true,
            message: 'Profile updated successfully',
            user: userPayload,
        });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).send({ success: false, message: 'Error updating profile', error });
    }
};