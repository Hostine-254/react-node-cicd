const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpContoller(req,res){
    try{
        const { email, password, name} = req.body

        const user = await userModel.findOne({email})

        if(user){
            throw new Error("User Already exists")
        }

        console.log("req.body : ",req.body)

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword =await  bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error("Something went wrong")
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "User created successfully"
        })



    }
    catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}


module.exports = userSignUpContoller