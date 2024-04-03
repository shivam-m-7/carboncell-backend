require("./config/db")

const express = require('express');
const routes = require('./routes');
const bodyParser = require("body-parser");
const app = express()
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js API with Swagger',
            version: '1.0.0',
            description: 'A simple API to demonstrate Swagger integration with Node.js',
        },
    },
    // Path to the API docs
    apis: ['./routes/*.js'], // Assuming your routes are in a directory named 'routes'
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger API documentation
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT;

app.use(bodyParser.json())
app.use('/api/v1/', routes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})