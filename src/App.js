import React, { useEffect } from 'react'
import axios from 'axios'

function App() {
  const fetchData = async () => {
    try {
      const responce = await axios.get('http://localhost:8000/data')
      console.log(responce.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <div className="App"></div>
}

export default App
