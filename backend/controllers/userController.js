const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')

// http://localhost:5000/api/users/register
const registerUser = async (req, res) => {
    try{
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message: 'All fields are required'})
        }

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(409).json({message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10); // ✅ hash first

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword // ✅ use hashed password
        });
        await newUser.save();

        res.status(201).json({message: 'User registered successfully', user: newUser});

    }catch(error){
        console.error('Error in registerUser', error.message)
        return res.status(500).json({error: 'internal server error'})
    }
}

// http://localhost:5000/api/users/login
const userLogin = async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error: 'email and password required'});
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        res.status(200).json({message: "Login Successful",user:user})
    }catch(error){
        console.error('Error in loginUser', error.message)
        return res.status(500).json({error: 'internal server error'})
    }
}

const getUser = async(req, res)=>{
    try{
        const username = req.params.username;
        if(!username){
            return res.status(400).json({error: 'username is required'})
        }

        const userDetails = await userModel.find({username}).select('-password')
        if(!userDetails){
            return res.status(400).json({error: 'user not found'})
        }
        return res.status(200).json({message: 'user fetched successfully', userDetails:userDetails})
    }catch(error){
        console.error("error in getUser: ", error.message);
        return res.status(500).json({error: 'internal server error'})
    }
}

// http://localhost:5000/api/users/updateuser/<userId>
const updateUser = async(req, res)=>{
    try{
        const userId = req.params.userId;
        if(!userId){
            return res.status(400).json({error: 'userId required'})
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, req.body, {new:true})
        if(!updatedUser){
            return res.status(400).json({error: 'Failed to update user'})
        }
        return res.status(200).json({message: 'user updated successfully', updatedUser:updatedUser})
    }catch(error){
        console.error("error in updateUser: ",error.message);
        return res.status(500).json({error: 'internal server error'})
    }
}

// http://localhost:5000/api/users/deleteuser/<userId>
const deleteUser = async(req, res)=>{
    try{
        const userId = req.params.userId;
        if(!userId){
            return res.status(400).json({error: 'userId required'})
        }

        const deletedUser = await userModel.findByIdAndDelete(userId)
        if(!deletedUser){
            return res.status(400).json({error: 'Failed to delete user'})
        }
        return res.status(200).json({message: 'user successfully deleted', deleteUser:deletedUser})
    }catch(error){
        console.error("error is deleteUser",error.message);
        return res.status(500).json({error: 'internal server error'})
    }
}
module.exports = {registerUser, userLogin, updateUser, deleteUser, getUser}