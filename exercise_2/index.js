const express = require('express')
const app = express()
const port = 9999
const matchAndPostResults = require('./lib').matchAndPostResults



app.get('/',  async (req, res) => {

  try {

    let results =  await matchAndPostResults()
    res.send('Data posted successfully..')

  } catch (err) {

    console.log(`Error ${err}`)
    res.status(500).send('Error Occured');
  }

})

app.listen(port, () => console.log(`App listening on port ${port}!`))