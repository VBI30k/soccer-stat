/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const port = 8000

app.use(cors())

app.get('/matches/:id', async (req, res) => {
  try {
    const response = await axios.get(
      req.query.dateFrom
        ? `https://api.football-data.org/v4/competitions/${req.params.id}/matches?dateFrom=${req.query.dateFrom}&dateTo=${req.query.dateTo}`
        : `https://api.football-data.org/v4/competitions/${req.params.id}/matches`,
      {
        headers: {
          'X-Auth-Token': 'd99448926b8640a28745ef55e381a06f',
        },
      }
    )
    res.status(200).json(response.data)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

app.get('/competitions', async (req, res) => {
  try {
    const response = await axios.get(
      'https://api.football-data.org/v4/competitions/'
    )
    res.status(200).json(response.data)
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

app.listen(port, () => {
  console.log(`Api server listening on port ${port}`)
})
