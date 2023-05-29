import {
  Box,
  Button,
  CssBaseline,
  Paper,
  Typography,
} from "@mui/material";
import { CategoryScale } from "chart.js";
import { Chart } from "chart.js/auto";
import React, { useState } from "react";
import { toast } from "react-toastify";
import LineChart from "../components/LineChart";
import { Data } from "../utils/Data";
import { collection, doc, getDocs } from "firebase/firestore";
import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import { database } from "../firebase-config";

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
  // useEffect(() => {
  //   const setWaters = async () => {
  //     set(ref(database, "water/" + "water2"), {
  //       state: "false",
  //     });
  //   };
  //   setWaters();
  // }, []);

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Value",
        data: Data.map((data) => data.value),
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
    const dbRef = ref(getDatabase());
    get(child(dbRef, `auth/user2`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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
      <Box
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
        <Paper sx={{ padding: "20px", mt: 3 }}>
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
                flexDirection: {xs: 'column', md: 'row'},
                justifyContent: "space-around",
                mb: 3,
              }}
            >
              <LineChart data={chartData} info={info[0]} />
              <LineChart data={chartData} info={info[1]} />
            </Box>
            <LineChart
              data={chartData}
              info={info[2]}
              sx={{ display: "flex" }}
            />
          </Box>
        </Paper>
        <Box
          sx={{
            my: 4,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            minWidth: {xs: '600px', md: '1000px'},
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
      </Box>
    </div>
  );
}

export default HomePage;
