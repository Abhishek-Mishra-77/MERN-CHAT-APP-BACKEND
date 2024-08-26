import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
const SECRET_KEY = 'your-secret-key';

const registerUser = async (req, res) => {
    const { name, email, password, pic } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userPic = pic ? pic : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";


    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        pic: userPic
    });

    // Generate JWT token
    const token = jsonwebtoken.sign(
        { _id: newUser._id, name: newUser.name, email: newUser.email },
        SECRET_KEY,
        { expiresIn: '30d' }
    );

    if (newUser) {
        res.status(201).json({ _id: newUser._id, name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin, pic: newUser.pic, token });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }

}

export { registerUser }