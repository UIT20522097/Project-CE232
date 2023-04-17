import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import tempIcon from "./tempurature.png";
import airHumidityIcon from "./doamkk.png";
import soilMoistureIcon from "./doamdat.png";
import moonIcon from "./moon.png";
import sunIcon from "./sun.png";

export default function InfoCard({ infoName, value }) {
  return (
    <Card
      sx={{
        minWidth: 345,
        maxWidth: 400,
        margin: 3,
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 1,
        }}
      >
        <CardMedia
          component="img"
          image={
            infoName === "Nhiệt độ"
              ? `${tempIcon}`
              : infoName === "Độ ẩm không khí"
              ? `${airHumidityIcon}`
              : infoName === "Độ ẩm đất"
              ? `${soilMoistureIcon}`
              : (infoName === "Ánh sáng" && value === "Ban ngày")
              ? `${sunIcon}` : `${moonIcon}`
          }
          alt="icon"
          sx={{ width: "200px" }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography gutterBottom variant="h4" component="div">
            {infoName}
          </Typography>
          <Typography variant="h3" color="text.secondary">
            {value}
            {infoName === "Nhiệt độ"
              ? "°C"
              : infoName === "Ánh sáng"
              ? ""
              : "%"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
