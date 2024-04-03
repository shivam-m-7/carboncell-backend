const UserModel = require('../../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    // validate req.body
    // create mongoDB model
    // do password encryption
    // return response to client
    registerUser: async (req, res) => {
        const userModel = new UserModel(req.body);
        userModel.password = await bcrypt.hash(req.body.password, 10);
        try {
            const response = await userModel.save();
            response.password = undefined;
            return res.status(201).json({ message: 'success', data: response });
        } catch (err) {
            return res.status(500).json({ message: 'error', err })
        }
    },
    loginUser: async (req, res) => {
        try {
            const userModel = await UserModel.findOne({ email: req.body.email })
            if (!userModel) {                
                return res.status(401).json({ message: 'error', error: 'Invalid username or password' })
            }

            const isPasswordEqual = await bcrypt.compare(req.body.password, userModel.password)
            if (!isPasswordEqual) {
                return res.status(401).json({ message: 'error', error: 'Invalid username or password' })
            }

            const tokenObject = {
                _id: userModel._id,
                email: userModel.email,
                firstName: userModel.firstName,
            }

            const jwtToken = jwt.sign(tokenObject, process.env.SECRET, { expiresIn: '4h' })

            return res.status(200).json({
                message: 'success', data: {
                    token: jwtToken
                }
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'error', error: err })
        }
    }
}