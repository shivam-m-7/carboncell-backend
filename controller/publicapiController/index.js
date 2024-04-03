module.exports = {
    getPublicApiData : async (req, res) => {
        const {query} = req.querymen;
        
        var filters = Object.keys(query).map(item => `${item}=${query[item]}`)

        try{
            const url = `https://api.publicapis.org/entries?${filters}`                        
            const response = await fetch(url)
            const result = await response.json()

            res.status(200).json({message: 'success', data: result})
        }catch(err){
            console.log(err)
            res.status(503).json({message: 'error', error: err})
        }        
    }
}