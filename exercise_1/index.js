const express = require('express')
const app = express()
const port = 9999
const getDivisibility = require('./lib').getDivisibility



app.get('/',  async (req, res) => {

  try {

    let results =  await getDivisibility()
    res.send(results)

  } catch(err) {
    console.log(`Error: ${err}`)
    res.status(500).send('Error Occured');
  }

})

app.listen(port, () => console.log(`App listening on port ${port}!`))