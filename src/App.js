import './App.scss'

import {
  Alert,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Pagination,
  Snackbar,
  Stack,
  Tab,
  TextField,
  Typography,
} from '@mui/material'
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

const pageSize = 12

function App() {
  const [openTabs, setOpenTabs] = useState('0')
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const [filterName, setFilterName] = useState('')

  const [leagesPage, setLeaguesPage] = useState(1)
  const [leaguesCount, setLeaguesCount] = useState(169)
  const [leaguesData, setLeaguesData] = useState([
    {
      id: 2166,
      area: {
        id: 2001,
        name: 'Africa',
        code: 'AFR',
        flag: null,
      },
      name: 'AFC Champions League',
      code: 'ACL',
      type: 'CUP',
      emblem: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 1559,
        startDate: '2022-04-06',
        endDate: '2023-05-05',
        currentMatchday: null,
        winner: null,
      },
      numberOfAvailableSeasons: 1,
      lastUpdated: '2023-02-26T12:57:33Z',
    },
    {
      id: 2006,
      area: {
        id: 2001,
        name: 'Africa',
        code: 'AFR',
        flag: null,
      },
      name: 'WC Qualification CAF',
      code: 'QCAF',
      type: 'CUP',
      emblem: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 555,
        startDate: '2019-09-04',
        endDate: '2021-11-16',
        currentMatchday: 6,
        winner: null,
      },
      numberOfAvailableSeasons: 2,
      lastUpdated: '2022-03-13T18:51:44Z',
    },
    {
      id: 2023,
      area: {
        id: 2011,
        name: 'Argentina',
        code: 'ARG',
        flag: 'https://crests.football-data.org/762.png',
      },
      name: 'Primera B Nacional',
      code: null,
      type: 'LEAGUE',
      emblem: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 716,
        startDate: '2021-03-13',
        endDate: '2021-12-26',
        currentMatchday: 17,
        winner: null,
      },
      numberOfAvailableSeasons: 5,
      lastUpdated: '2021-04-17T11:21:38Z',
    },
    {
      id: 2024,
      area: {
        id: 2011,
        name: 'Argentina',
        code: 'ARG',
        flag: 'https://crests.football-data.org/762.png',
      },
      name: 'Liga Profesional',
      code: 'ASL',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/LPDF.svg',
      plan: 'TIER_TWO',
      currentSeason: {
        id: 1536,
        startDate: '2023-01-27',
        endDate: '2023-08-05',
        currentMatchday: 21,
        winner: null,
      },
      numberOfAvailableSeasons: 6,
      lastUpdated: '2021-05-28T18:02:40Z',
    },
    {
      id: 2149,
      area: {
        id: 2011,
        name: 'Argentina',
        code: 'ARG',
        flag: 'https://crests.football-data.org/762.png',
      },
      name: 'Copa Liga Profesional',
      code: null,
      type: 'LEAGUE',
      emblem: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 717,
        startDate: '2021-02-12',
        endDate: '2021-05-30',
        currentMatchday: 13,
        winner: null,
      },
      numberOfAvailableSeasons: 2,
      lastUpdated: '2021-04-17T06:00:34Z',
    },
    {
      id: 2025,
      area: {
        id: 2011,
        name: 'Argentina',
        code: 'ARG',
        flag: 'https://crests.football-data.org/762.png',
      },
      name: 'Supercopa Argentina',
      code: null,
      type: 'SUPER_CUP',
      emblem: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 430,
        startDate: '2019-04-04',
        endDate: '2019-04-04',
        currentMatchday: null,
        winner: null,
      },
      numberOfAvailableSeasons: 2,
      lastUpdated: '2019-05-03T05:08:18Z',
    },
    {
      id: 2147,
      area: {
        id: 2014,
        name: 'Asia',
        code: 'ASI',
        flag: null,
      },
      name: 'WC Qualification AFC',
      code: 'QAFC',
      type: 'CUP',
      emblem: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 465,
        startDate: '2019-06-06',
        endDate: '2021-11-16',
        currentMatchday: 10,
        winner: null,
      },
      numberOfAvailableSeasons: 2,
      lastUpdated: '2021-11-11T10:31:11Z',
    },
    {
      id: 2008,
      area: {
        id: 2015,
        name: 'Australia',
        code: 'AUS',
        flag: null,
      },
      name: 'A League',
      code: 'AAL',
      type: 'LEAGUE',
      emblem: null,
      plan: 'TIER_TWO',
      currentSeason: {
        id: 1527,
        startDate: '2022-10-07',
        endDate: '2023-04-30',
        currentMatchday: 26,
        winner: null,
      },
      numberOfAvailableSeasons: 6,
      lastUpdated: '2021-04-17T07:19:35Z',
    },
    {
      id: 2026,
      area: {
        id: 2015,
        name: 'Australia',
        code: 'AUS',
        flag: null,
      },
      name: 'FFA Cup',
      code: null,
      type: 'CUP',
      emblem: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 592,
        startDate: '2020-02-19',
        endDate: '2020-10-28',
        currentMatchday: null,
        winner: null,
      },
      numberOfAvailableSeasons: 3,
      lastUpdated: '2019-10-23T23:59:22Z',
    },
    {
      id: 2020,
      area: {
        id: 2016,
        name: 'Austria',
        code: 'AUT',
        flag: 'https://crests.football-data.org/816.svg',
      },
      name: 'Erste Liga',
      code: null,
      type: 'LEAGUE',
      emblem: null,
      plan: 'TIER_FOUR',
      currentSeason: {
        id: 626,
        startDate: '2020-09-11',
        endDate: '2021-05-21',
        currentMatchday: 30,
        winner: null,
      },
      numberOfAvailableSeasons: 4,
      lastUpdated: '2021-04-17T11:29:52Z',
    },
    {
      id: 2012,
      area: {
        id: 2016,
        name: 'Austria',
        code: 'AUT',
        flag: 'https://crests.football-data.org/816.svg',
      },
      name: 'Bundesliga',
      code: 'ABL',
      type: 'LEAGUE',
      emblem: null,
      plan: 'TIER_THREE',
      currentSeason: {
        id: 1507,
        startDate: '2022-07-22',
        endDate: '2023-06-03',
        currentMatchday: 32,
        winner: null,
      },
      numberOfAvailableSeasons: 6,
      lastUpdated: '2021-04-17T07:19:35Z',
    },
    {
      id: 2022,
      area: {
        id: 2016,
        name: 'Austria',
        code: 'AUT',
        flag: 'https://crests.football-data.org/816.svg',
      },
      name: 'Playoffs 1/2',
      code: 'APL',
      type: 'PLAYOFFS',
      emblem: null,
      plan: 'TIER_TWO',
      currentSeason: {
        id: 24,
        startDate: '2018-05-31',
        endDate: '2018-06-03',
        currentMatchday: null,
        winner: {
          id: 2022,
          name: 'spusu SKN St. Pölten',
          shortName: 'St. Pölten',
          tla: 'STP',
          crest: 'https://crests.football-data.org/2022.svg',
          address: 'Bimbo Binder Promenade 9 Sankt Pölten 3100',
          website: 'http://www.skn-stpoelten.at',
          founded: 2000,
          clubColors: 'Yellow / Blue',
          venue: 'NV Arena',
          lastUpdated: '2021-05-22T07:53:43Z',
        },
      },
      numberOfAvailableSeasons: 1,
      lastUpdated: '2018-08-23T15:47:33Z',
    },
  ])

  const fetchData = async () => {
    try {
      const responce = await axios.get('http://localhost:8000/competitions')
      setLeaguesData(responce.data.competitions)
      setLeaguesCount(responce.data.count)
    } catch (error) {
      setOpenSnackbar(true)
    }
  }

  const changeFilter = (event) => {
    setFilterName(event.target.value)
  }

  const changePage = (event, value) => {
    setLeaguesPage(value)
  }

  const changeTab = (event, value) => {
    setOpenTabs(value)
  }

  useEffect(() => {
    setLeaguesCount(
      leaguesData.filter((league) => {
        return (
          league.name.includes(filterName) ||
          league.area.name.includes(filterName)
        )
      }).length
    )
  }, [filterName])

  useEffect(() => {
    // fetchData()
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={() => {
            setOpenSnackbar(false)
          }}
        >
          <Alert severity="error">Ошибка получение данных!</Alert>
        </Snackbar>
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
            <Container>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  marginBottom: '24px',
                }}
              >
                <SearchIcon
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                ></SearchIcon>
                <TextField
                  id="input-with-sx"
                  label="Поиск"
                  variant="standard"
                  onChange={changeFilter}
                />
              </Box>
              <Grid container spacing={2}>
                {leaguesData
                  .filter((league) => {
                    return (
                      league.name.includes(filterName) ||
                      league.area.name.includes(filterName)
                    )
                  })
                  .slice((leagesPage - 1) * pageSize, leagesPage * pageSize)
                  .map((league) => {
                    return (
                      <Grid item xs={4} key={league.id}>
                        <Card>
                          <CardContent
                            sx={{
                              userSelect: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              height: '150px',
                              padding: '16px !important',
                            }}
                          >
                            <Typography
                              align={'center'}
                              variant="h6"
                              sx={{ marginBottom: '10px' }}
                            >
                              {league.name}
                            </Typography>
                            <Typography align={'center'} variant="subtitle1">
                              {league.area.name}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  })}
              </Grid>
              <Stack alignItems="center" mt={4}>
                <Pagination
                  count={Math.ceil(leaguesCount / pageSize) ?? 1}
                  page={leagesPage ?? 1}
                  onChange={changePage}
                ></Pagination>
              </Stack>
            </Container>
          </TabPanel>
          <TabPanel value="1">Item Two</TabPanel>
        </TabContext>
      </ThemeProvider>
    </div>
  )
}

export default App
