
const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res,next) => {

    let random = Math.floor(Math.random() * 100 )
    if (random <70){
        next('Error')
    }else{
        res.json({lower:1,upper:100})
    }
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
