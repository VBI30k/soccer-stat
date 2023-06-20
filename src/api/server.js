/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const port = 8000

app.use(cors())

app.get('/data', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/matches')
    res.status(200).json(response.data)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

app.listen(port, () => {
  console.log(`Api server listening on port ${port}`)
})
