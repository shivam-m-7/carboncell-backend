const querymen = require('querymen')

const filterSchema = new querymen.Schema({
    title: {
        type: String,
        paths: ['title'],
        operator: '$eq'
    },
    description: {
        type: String,
        paths: ['description'],
        operator: '$eq'
    },
    category: {
        type: String,
        paths: ['category'],
        operator: '$eq'
    },
    
})

module.exports = {
    filterSchema
}