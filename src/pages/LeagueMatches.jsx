import 'dayjs/locale/ru'

import {
  Alert,
  Breadcrumbs,
  Container,
  Snackbar,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { DataGrid } from '@mui/x-data-grid'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import axios from 'axios'
import dayjs from 'dayjs'
import { match_statuses } from '../types/match_statuses.js'
import { ruRU } from '@mui/x-date-pickers/locales'

const columns = [
  {
    field: 'utcDate',
    headerName: 'Дата проведения',
    minWidth: 150,
    flex: 2,
    valueFormatter: (params) => {
      return dayjs(params.value).format('DD.MM.YYYY')
    },
  },
  {
    field: 'utcDateTime',
    headerName: 'Время',
    minWidth: 100,
    flex: 1,
    valueGetter: (params) => {
      return dayjs(params.row.utcDate).format('HH.mm')
    },
  },
  {
    field: 'status',
    headerName: 'Статус',
    minWidth: 120,
    flex: 1,
    valueFormatter: (params) => {
      return match_statuses[params.value]
    },
  },
  {
    field: 'commands',
    headerName: 'Название команд',
    minWidth: 450,
    flex: 5,
    renderCell: (params) => {
      return (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 10px 1fr',
            width: '100%',
          }}
        >
          <span>{params.row.homeTeam.name}</span>
          <span>-</span>
          <span style={{ textAlign: 'end' }}>{params.row.awayTeam.name}</span>
        </div>
      )
    },
  },
  {
    field: 'result',
    headerName: 'Счет',
    minWidth: 120,
    headerAlign: 'center',
    align: 'center',
    flex: 2,
    valueGetter: (params) => {
      return (
        params.row.score.fullTime.home + ':' + params.row.score.fullTime.away
      )
    },
  },
]

export default function LeagueMatches({ leagueId, setLeagueId }) {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [leagueName, setLeagueName] = useState('Загрузка...')
  const [matchesData, setMatchesData] = useState(null)

  const [matchesDates, setMatchesDates] = useState([dayjs(), dayjs()])

  const fetchData = async () => {
    try {
      const responce = await axios.get(
        `http://localhost:8000/matches/${leagueId}`
      )
      setLeagueName(responce.data.competition.name)
      setMatchesData(responce.data.matches)
      setMatchesDates([
        dayjs(responce.data.resultSet.first),
        dayjs(responce.data.resultSet.last),
      ])
    } catch {
      setOpenSnackbar(true)
      setLeagueName('')
    }
  }

  const changeDates = async (newDates) => {
    try {
      const responce = await axios.get(
        `http://localhost:8000/matches/${leagueId}?dateFrom=${dayjs(
          newDates[0]
        ).format('YYYY-MM-DD')}&dateTo=${dayjs(newDates[1]).format(
          'YYYY-MM-DD'
        )}`
      )
      setMatchesData(responce.data.matches)
      setMatchesDates(newDates)
    } catch {
      setOpenSnackbar(true)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="ru"
      localeText={
        ruRU.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <Container>
        <Breadcrumbs separator="›" sx={{ userSelect: 'none' }}>
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setLeagueId(null)
            }}
          >
            Лиги
          </Typography>
          <Typography>{leagueName}</Typography>
        </Breadcrumbs>

        {matchesData ? (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Матчи
            </Typography>
            <DateRangePicker
              value={matchesDates}
              onChange={changeDates}
              sx={{ width: '400px', mt: 2, mb: 4 }}
            />
            <DataGrid
              rows={matchesData}
              columns={columns}
              disableColumnMenu
            ></DataGrid>
          </>
        ) : null}

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
    </LocalizationProvider>
  )
}
