//@ts-check
const axios = require("axios");
const UserModel = require("../models/userrModel");
const { oauth2Client } = require("../utils/googleConfig");
const jwt = require("jsonwebtoken")


const googleLogin = async (req, res) => {
    try {
        console.log('req.body', req.body);
        const {code}  = req.query;

        const googleRes = await oauth2Client.getToken(code);

        oauth2Client.setCredentials(googleRes.tokens);

        const userRes =  await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);

        const { email, name, picture } = userRes.data;

        let user = await UserModel.findOne({email});

        if(!user){
            user = await UserModel.create({name, email, image: picture});
        }
        const { _id } = user;
       
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.status(200).json({message:'success' ,token, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = { googleLogin };