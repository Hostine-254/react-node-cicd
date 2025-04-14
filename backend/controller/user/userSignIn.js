const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const userModel = require("../../models/userModel")

async function userSignInController(req,res){
    try{
        const { email, password } = req.body

        if(!email){
            throw new Error("Please Provide correct Email")
        }
        if(!password){
            throw new Error("Please provide correct password")
        }

        const user = await userModel.findOne({email})

        if(!user){
            throw new Error("User not available")
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(checkPassword){
            const tokenData = {
                _id : user._id,
                email : user.email,

            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly : true,
                secure : false,
                sameSite: "lax"
            }
            res.cookie("token",token,tokenOption).json({
                message : "Login Successful",
                data : token,
                success : true,
                error : false
            })

        }
        else{
            throw new Error("Please check your password")
        }

        console.log("checkPassword :",checkPassword)

    }
    catch(err){
        res.json({
            message : err.message || err ,
            error : true,
            success : false,
        })
    }

}


module.exports = userSignInController