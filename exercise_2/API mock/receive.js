
const express = require('express')
const app = express()
const port = 3003
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', (req, res, next) => {

    let random = Math.floor(Math.random() * 100 )
    if (random <50){
        next('Error')
    }else{

        console.log(req.body)
        res.send('ok')
    }
    
   
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
