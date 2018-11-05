
const express = require('express')
const app = express()
const port = 3002

app.get('/', (req, res,next) => {

    let random = Math.floor(Math.random() * 100 )

    if (random <70){
        next('Error')
    }else{
        res.json({
            "outputDetails": [
                {
                    "divisor": 3,
                    "output": "Boss"
                },
                {
                    "divisor": 5,
                    "output": "Hogg"
                },
                {
                    "divisor": 1,
                    "output": "Gucci"
                },
                {
                    "divisor": 8,
                    "output": "Shanel"
                },
                {
                    "divisor": 10,
                    "output": "Dior"
                }
            ]
        })
    }
    
})

app.listen(port, () => console.log(`app listening on port ${port}!`))




