const Joi = require('joi')
const UserModel = require('../models/UserModel')

const userRegisterValidate = async (req, res, next) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).alphanum().required(),
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
        var errorObject = {}
        error.details.forEach((err) => {
            errorObject[err.context.label] = err.message
        })

        return res.status(400).json({ message: "Bad Request", error : errorObject })
    }

    const user = await UserModel.findOne({ email: req.body.email })
    if (user !== null) {
        return res.status(400).json({ message: "Bad Request", error: "User already registered" })
    }

    next();
}

const userLoginValidate = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })

    const { error, value } = schema.validate(req.body)

    if (error) {
        var errorObject = {}
        error.details.forEach((err) => {
            errorObject[err.context.label] = err.message
        })

        return res.status(400).json({ message: "Bad Request", error : errorObject })
    }

    next();
}

module.exports = {
    userRegisterValidate,
    userLoginValidate
}