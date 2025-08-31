import express from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../models/authModels.js'

export const Register = async (req, res) => {
    const { name, email, mobile, password } = req.body
    if (!name || !email || !mobile || !password) {
        return res.status(400).json({ message: "All fields are required!" })
    }
    try {
        const exsitingUser = await User.findOne({ email })
        if (exsitingUser) {
            return res.status(409).json({ message: "Email already registered." });
        }

        const user = new User({ name, email, mobile, password })
        await user.save()

        const savedUser = await User.findById(user._id);
        const token = jwt.sign(
            { id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' }
        );
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     sameSite: 'Lax',
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 24 * 60 * 60 * 1000

        // })

        res.cookie('token', token, {
            httpOnly: true,                          // not accessible via JS
            secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // cross-site in prod
            maxAge: 24 * 60 * 60 * 1000              // 1 day
        });


        // Backend cookie
        const { password: _, ...userWithoutPassword } = savedUser.toObject();
        res.status(200).json({ token, user: userWithoutPassword })
    } catch (error) {
        res.status(400).json({ message: error.message || "User not registered" });
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     sameSite: 'Lax',
        //     secure: process.env.NODE_ENV === 'production',
        //     maxAge: 24 * 60 * 60 * 1000
        // })

        res.cookie('token', token, {
            httpOnly: true,                          // not accessible via JS
            secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // cross-site in prod
            maxAge: 24 * 60 * 60 * 1000              // 1 day
        });


        const { password: _, ...userWithoutPassword } = user.toObject()
        res.status(200).json({ token, user: userWithoutPassword })
    } catch (error) {
        res.status(500).json({ error: error.message || "Login Failed!!" });
    }
}

export const GetUser = async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "No token is provided" })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decode.id).select('-password')
        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(401).json({ message: "Invalid or expired token" });
    }
}

// export const Logout = async (req, res) => {
//     res.clearCookie('token', {
//         httpOnly: true,
//         sameSite: 'Lax',
//         secure: process.env.NODE_ENV === 'production'
//     });

//     return res.status(200).json({ message: "Logged out successfully" });
// };

export const Logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        secure: process.env.NODE_ENV === 'production'
    });

    return res.status(200).json({ message: "Logged out successfully" });
};
