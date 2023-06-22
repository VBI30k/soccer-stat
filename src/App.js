import './App.scss'

import { Box, Container, Tab, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'
import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const [openTabs, setOpenTabs] = useState('0')

  const fetchData = async () => {
    try {
      const responce = await axios.get('http://localhost:8000/competitions')
    } catch (error) {
      console.log(error)
    }
  }

  const changeTab = (event, value) => {
    setOpenTabs(value)
  }

  useEffect(() => {
    // fetchData()
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <TabContext value={openTabs}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              marginBottom: '16px',
            }}
          >
            <div className="header__logo"></div>
            <TabList onChange={changeTab}>
              <Tab label="Лиги" sx={{ height: 64 }} value="0" />
              <Tab label="Команды" sx={{ height: 64 }} value="1" />
            </TabList>
          </Box>
          <TabPanel value="0">Item One</TabPanel>
          <TabPanel value="1">Item Two</TabPanel>
        </TabContext>

        {/* <Container>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <SearchIcon
              sx={{ color: 'action.active', mr: 1, my: 0.5 }}
            ></SearchIcon>
            <TextField id="input-with-sx" label="Поиск" variant="standard" />
          </Box>
        </Container> */}
      </ThemeProvider>
    </div>
  )
}

export default App
