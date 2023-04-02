import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import { CategoryScale } from "chart.js";
import { Chart } from "chart.js/auto";
import React, { useState } from "react";
import LineChart from "../components/LineChart";
import StateTable from "../components/StateTable";
import { Data } from '../utils/Data'

Chart.register(CategoryScale);



function HomePage() {
  const [coolState, setCoolState] = useState(false)
  const [lightState, setLightState] = useState(false)
  const [waterState, setWaterState] = useState(false)

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "&quot#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  const handleCooling = () => {
    setCoolState(!coolState)
  }

  const handleLight = () => {
    setLightState(!lightState)
  }

  const handleWater = () => {
    setWaterState(!waterState)
  }

  const handleAuto = () => {
    if (1) handleCooling()
    if (1) handleLight()
    if (1) handleWater()
  }

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={3}
          md={7}

        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}

          >
            <Typography variant="h3" component="h" >State Of Garden</Typography>
            <StateTable />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} elevation={6} >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" component="h4" alignSelf="center"
            >Controller</Typography>
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
              <Typography variant="h4"  >Điều hòa</Typography>
              {coolState ? <Button onClick={handleCooling} variant="contained" sx={{
                backgroundColor: '#3498db', "&:hover": {
                  color: '#AAAFB4',
                  backgroundColor: '#3498db'
                },
              }}>On</Button> : <Button onClick={handleCooling} variant="contained" sx={{
                backgroundColor: '#AAAFB4', "&:hover": {
                  color: '#fff',
                  backgroundColor: '#AAAFB4'
                },
              }}>Off</Button>}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
              <Typography variant="h4"  >Đèn</Typography>
              {lightState ? <Button onClick={handleLight} variant="contained" sx={{
                backgroundColor: '#3498db', "&:hover": {
                  color: '#AAAFB4',
                  backgroundColor: '#3498db'
                },
              }}>On</Button> : <Button onClick={handleLight} variant="contained" sx={{
                backgroundColor: '#AAAFB4', "&:hover": {
                  color: '#fff',
                  backgroundColor: '#AAAFB4'
                },
              }}>Off</Button>}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
              <Typography variant="h4"  >Tưới</Typography>
              {waterState ? <Button onClick={handleWater} variant="contained" sx={{
                backgroundColor: '#3498db', "&:hover": {
                  color: '#AAAFB4',
                  backgroundColor: '#3498db'
                },
              }}>On</Button> : <Button onClick={handleWater} variant="contained" sx={{
                backgroundColor: '#AAAFB4', "&:hover": {
                  color: '#fff',
                  backgroundColor: '#AAAFB4'
                },
              }}>Off</Button>}
            </Box>
            <Button onClick={handleAuto} variant="contained" sx={{
              backgroundColor: '#3498db', opacity: 0.9, "&:hover": {
                color: '#fff',
                opacity: 1
              },
            }}>AutoComplete</Button>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <LineChart chartData={chartData} />
      </Box>
    </div>
  );
}

export default HomePage;