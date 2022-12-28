//const State = require("country-state-city").State

const UserModel = require("../models/userModel")
const jwt = require("jsonwebtoken");


const isValidEmail = function (email) {
    let checkemail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    if (checkemail.test(email)) {
        return true;
    }
    return false;
}

const isValidpassword = function (password) {

    let checkPassword = /^[a-zA-Z0-9!@#$%^&*]{8,15}$/
    if (checkPassword.test(password)) {
        return true
    }
    return false
}


const userRegistrationService = async function(req, res){
    try {
        let data = req.body
        let image = req.file

        let {name, mobile, email, password, state, city, description} = data

        if(!name){
            return res.status(400).send({status: false, msg: "Please enter your name "})
        }
        if(!mobile){
            return res.status(400).send({status: false, msg: "Please enter your mobile number "})
        }

        if (!email) {
            return res.status(400).send({ status: false, msg: "Oops! you forgot to enter email address" })
        }

        if (!isValidEmail(email)) { return res.status(400).send({ status: false, msg: 'Please enter valid emailId' }) }
        let uniqueEmail = await UserModel.findOne({ email: email })

        if (uniqueEmail) {
            return res.status(400).send({ status: false, msg: "Sorry! this email is already exists" })
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: "Oops! you forgot to enter Password" })
        }
        if (!isValidpassword(password)) { return res.status(400).send({ status: false, msg: "password should be have minimum 8 character and max 15 character" }) }


        if (!image){
            return res.status(400).send({ status: false, message: "Please upload profile image" });
        }
        
        // if (image.length > 1){
        //     return res.status(400).send({ status: false, message: "only one image at a time" });
        // }
        

        let uploadedImage = await UserModel(image);
        let obj = {
            name:name,
            email:email,
            password: password,
            mobile:mobile,
            description:description,
            state: state,
            city:city,
            image : uploadedImage
            
        };
        let userData = await UserModel.create(obj);
        res.status(201).send({
        status: true,
        message: "User registered successfully",
        data: userData
    });
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })
        
    }
}

const userLogin = async function(req, res){
    try {
        let email=req.body.email;
        let password=req.body.password;

        let validate_user=UserModel.findOne({email:email,password:password});
        if(!validate_user){
            return res.status(400).send({
                status: false,
                msg: "Email and Password is not correct",
            });
        }
        const token = jwt.sign(
            {
                email: email,
            },
            "RUBIXE"
            );
            res.setHeader("header-token", token);
            res.status(200).send({
            status: true,
            msg: "You are Logged in!!",
            data: { token: token },
            });
        
    } catch (error) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })
    }
}


const getALL = async function(req, res){
    try {
        let allData = await UserModel.find()

        res.status(200).send({
            status: true,
            data: allData,
            });

    } catch (error) {
        console.log(err)
        res.status(500).send({ status: false, message: err.message })
    }
}



module.exports ={ userRegistrationService,userLogin, getALL}