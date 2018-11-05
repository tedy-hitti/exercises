const express = require('express')
const app = express()
const port = 3002

app.get('/', (req, res,next) => {

    let random = Math.floor(Math.random() * 100 )
    if (random <50){
        next('Error')
    }else{
        res.json({
            "subTexts": [
                "Peter",
                "peter",
                "Pick",
                "Pi",
                "Z",
                "me (",
                "p"
            ]
            }
        )
    }
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
