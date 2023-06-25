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
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import axios from 'axios'

const pageSize = 12

export default function Leagues({ setLeagueId }) {
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const [filterName, setFilterName] = useState('')

  const [leagesPage, setLeaguesPage] = useState(1)
  const [leaguesCount, setLeaguesCount] = useState(169)
  const [leaguesData, setLeaguesData] = useState([])

  const fetchData = async () => {
    try {
      const responce = await axios.get('http://localhost:8000/competitions')
      setLeaguesData(responce.data.competitions)
      setLeaguesCount(responce.data.count)
    } catch {
      setOpenSnackbar(true)
    }
  }

  const changeFilter = (event) => {
    setFilterName(event.target.value)
  }

  const changePage = (event, value) => {
    setLeaguesPage(value)
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
    fetchData()
  }, [])

  return (
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
              <Grid item xs={12} sm={6} md={4} key={league.id}>
                <Card
                  onClick={() => {
                    setLeagueId(league.id)
                  }}
                >
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => {
          setOpenSnackbar(false)
        }}
      >
        <Alert severity="error">Ошибка получение данных!</Alert>
      </Snackbar>
    </Container>
  )
}
