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

export default function Commands({ setCommandId, setCommandName }) {
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const [filterName, setFilterName] = useState('')

  const [commandsPage, setCommandsPage] = useState(1)
  const [commandsCount, setCommandsCount] = useState(169)
  const [commandsData, setCommandsData] = useState([])

  const fetchData = async () => {
    try {
      const responce = await axios.get('http://localhost:8000/commands')
      setCommandsData(responce.data.teams)
      setCommandsCount(responce.data.count)
    } catch {
      setOpenSnackbar(true)
    }
  }

  const changeFilter = (event) => {
    setFilterName(event.target.value)
  }

  const changePage = (event, value) => {
    setCommandsPage(value)
  }

  useEffect(() => {
    setCommandsCount(
      commandsData.filter((command) => {
        return command.name.includes(filterName)
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
        {commandsData
          .filter((command) => {
            return command.name.includes(filterName)
          })
          .slice((commandsPage - 1) * pageSize, commandsPage * pageSize)
          .map((command) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={command.id}>
                <Card
                  onClick={() => {
                    setCommandId(command.id)
                    setCommandName(command.name)
                  }}
                >
                  <CardContent
                    sx={{
                      userSelect: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '150px',
                      padding: '16px !important',
                    }}
                  >
                    <Typography align={'center'} variant="h6">
                      {command.name}
                    </Typography>
                    <div
                      style={{
                        height: '80px',
                        backgroundImage: `url(${command.crest})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                      }}
                    ></div>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
      </Grid>
      <Stack alignItems="center" mt={4}>
        <Pagination
          count={Math.ceil(commandsCount / pageSize) ?? 1}
          page={commandsPage ?? 1}
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
