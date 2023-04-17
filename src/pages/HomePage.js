import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { CategoryScale } from "chart.js";
import { Chart } from "chart.js/auto";
import React, { useState } from "react";
import { toast } from "react-toastify";
import FanCard from "../components/FanCard";
import InfoCard from "../components/InfoCard";
import LightCard from "../components/LightCard";
import LineChart from "../components/LineChart";
import RainCard from "../components/RainCard";
import { Data } from "../utils/Data";

Chart.register(CategoryScale);

const infomation = [
  {
    infoName: "Nhiệt độ",
    value: "30",
  },
  {
    infoName: "Độ ẩm không khí",
    value: "50",
  },
  {
    infoName: "Độ ẩm đất",
    value: "30",
  },
  {
    infoName: "Ánh sáng",
    value: "Ban ngày",
  },
];

function HomePage() {
  const [coolState, setCoolState] = useState(false);
  const [lightState, setLightState] = useState(false);
  const [waterState, setWaterState] = useState(false);

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
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const handleCooling = () => {
    coolState
      ? toast.success("Cooling Off !!!")
      : toast.success("Cooling On !!!");
    setCoolState(!coolState);
  };

  const handleLight = () => {
    lightState ? toast.success("Light Off !!!") : toast.success("Light On !!!");
    setLightState(!lightState);
  };

  const handleWater = () => {
    waterState
      ? toast.success("Watering Off !!!")
      : toast.success("Watering On !!!");
    setWaterState(!waterState);
  };

  const handleAuto = () => {
    if (1) handleCooling();
    if (1) handleLight();
    if (1) handleWater();
  };

  const info = [
    { name: "Độ ẩm đất", text: "Độ ẩm đất của khu vườn" },
    { name: "Độ ẩm không khí", text: "Độ ẩm không khí của khu vườn" },
    { name: "Nhiệt độ", text: "Nhiệt độ của khu vườn" },
  ];

  return (
    <div>
      <Grid
        container
        component="main"
        sx={{
          minHeight: "40vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CssBaseline />

        <Box
          sx={{
            my: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {infomation.map((info) => (
            <InfoCard infoName={info.infoName} value={info.value} />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FanCard turn={coolState} />
          <LightCard turn={lightState} />
          <RainCard turn={waterState} />
        </Box>
        <Box
          sx={{
            my: 4,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            minWidth: "1000px",
          }}
        >
          <Typography variant="h3" component="h4" alignSelf="center">
            Controller
          </Typography>
          <Box
            sx={{
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Điều hòa</Typography>
              {coolState ? (
                <Button
                  onClick={handleCooling}
                  variant="contained"
                  sx={{
                    backgroundColor: "#3498db",
                    "&:hover": {
                      color: "#AAAFB4",
                      backgroundColor: "#3498db",
                    },
                  }}
                >
                  On
                </Button>
              ) : (
                <Button
                  onClick={handleCooling}
                  variant="contained"
                  sx={{
                    backgroundColor: "#AAAFB4",
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "#AAAFB4",
                    },
                  }}
                >
                  Off
                </Button>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Đèn</Typography>
              {lightState ? (
                <Button
                  onClick={handleLight}
                  variant="contained"
                  sx={{
                    backgroundColor: "#3498db",
                    "&:hover": {
                      color: "#AAAFB4",
                      backgroundColor: "#3498db",
                    },
                  }}
                >
                  On
                </Button>
              ) : (
                <Button
                  onClick={handleLight}
                  variant="contained"
                  sx={{
                    backgroundColor: "#AAAFB4",
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "#AAAFB4",
                    },
                  }}
                >
                  Off
                </Button>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Tưới</Typography>
              {waterState ? (
                <Button
                  onClick={handleWater}
                  variant="contained"
                  sx={{
                    backgroundColor: "#3498db",
                    "&:hover": {
                      color: "#AAAFB4",
                      backgroundColor: "#3498db",
                    },
                  }}
                >
                  On
                </Button>
              ) : (
                <Button
                  onClick={handleWater}
                  variant="contained"
                  sx={{
                    backgroundColor: "#AAAFB4",
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "#AAAFB4",
                    },
                  }}
                >
                  Off
                </Button>
              )}
            </Box>
          </Box>
          <Button
            onClick={handleAuto}
            variant="contained"
            sx={{
              backgroundColor: "#3498db",
              opacity: 0.9,
              "&:hover": {
                color: "#fff",
                opacity: 1,
              },
            }}
          >
            AutoComplete
          </Button>
        </Box>
      </Grid>
      <Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              mb: 3,
            }}
          >
            <LineChart chartData={chartData} info={info[0]} />
            <LineChart chartData={chartData} info={info[1]} />
          </Box>
          <LineChart
            chartData={chartData}
            info={info[2]}
            sx={{ display: "flex" }}
          />
        </Box>
      </Paper>
    </div>
  );
}

export default HomePage;
