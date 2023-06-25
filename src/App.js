import './App.scss'

import { Box, Container, Tab } from '@mui/material'
import React, { useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'
import LeagueMatches from './pages/LeagueMatches'
import Leagues from './pages/Leagues'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const [openTabs, setOpenTabs] = useState('0')
  const [leagueId, setLeagueId] = useState(null)

  const changeTab = (event, value) => {
    setOpenTabs(value)
  }

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <TabContext value={openTabs}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Container sx={{ display: 'flex', gap: '20px' }}>
              <div className="header__logo"></div>
              <TabList onChange={changeTab}>
                <Tab label="Лиги" sx={{ height: 64 }} value="0" />
                <Tab label="Команды" sx={{ height: 64 }} value="1" />
              </TabList>
            </Container>
          </Box>
          <TabPanel value="0">
            {leagueId ? (
              <LeagueMatches
                leagueId={leagueId}
                setLeagueId={setLeagueId}
              ></LeagueMatches>
            ) : (
              <Leagues setLeagueId={setLeagueId}></Leagues>
            )}
          </TabPanel>
          <TabPanel value="1">Item Two</TabPanel>
        </TabContext>
      </ThemeProvider>
    </div>
  )
}

export default App
