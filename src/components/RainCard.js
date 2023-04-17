import * as React from "react";
import Card from "@mui/material/Card";
import "./RainCard.css";
import Cloud from './cloud.jpeg'; 
import rainingCloud from './rainingCloud.jpeg'; 

export default function RainCard({ turn }) {
  return (
    <Card
      sx={{
        width: 400,
        height: 380,
        margin: 3,
        backgroundImage: turn ? `url(${rainingCloud})` : `url(${Cloud})`,
        backgroundSize: 'cover',
        backgroundColor: "#fff"
      }}
    >
      <div class="container">
        {turn && <div class="rains">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>

          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>

          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>

          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>}
      </div>
    </Card>
  );
}
