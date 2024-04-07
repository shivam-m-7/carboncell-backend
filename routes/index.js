const express = require('express')
const { registerUser, loginUser } = require('../controller/userController')
const { userRegisterValidate, userLoginValidate } = require('../validator/userValidation')
const { authValidation } = require('../validator/authValidation')
const querymen = require('querymen')
const { filterSchema } = require('../config/filter')
const { getPublicApiData } = require('../controller/publicapiController')

const routes = express.Router()

// Routes

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with first name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registration successful
 *       '400':
 *         description: Bad request. Missing or invalid parameters.
 *       '500':
 *         description: Internal server error
 */
routes.post('/register', userRegisterValidate, registerUser)

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Unauthorized. Invalid credentials.
 *       '500':
 *         description: Internal server error
 */
routes.post('/login', userLoginValidate, loginUser)

/**
 * @swagger
 * /api/v1/getpublicapi:
 *   get:
 *     summary: Get public APIs with filtering
 *     description: Retrieve public APIs with optional filtering by category, title, and description. Requires authentication.
 *     security:
 *       - SimpleTokenAuth: []
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category.
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by title.
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: Filter by description.
 *     responses:
 *       '200':
 *         description: A list of public APIs 
 *       '401':
 *         description: Unauthorized. Token not provided or invalid token.
 *       '500':
 *         description: Internal server error
* components:
 *   securitySchemes:
 *     SimpleTokenAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: A simple token for authentication.
 */
routes.get('/getpublicapi', authValidation, querymen.middleware(filterSchema), getPublicApiData)

module.exports = routes
