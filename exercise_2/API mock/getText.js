
const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res,next) => {

    let random = Math.floor(Math.random() * 100 )
    if (random <50){
        next('Error')
    }else{
        res.json({
            "text": "Peter told me (actually he slurrred) that peter the pickle piper piped a pitted pickle before he petered out. Phew!"
           }
        )
    }
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
