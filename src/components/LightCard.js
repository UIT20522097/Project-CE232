import * as React from "react";
import Card from "@mui/material/Card";
import "./LightCard.css";

export default function LightCard({ turn }) {
  return (
    <Card
      sx={{
        width: 400,
        height: 380,
        margin: 3,
      }}
    >
      <div class="lamp js-turnoff-btn">
	<div class="lamp-item lamp-top"></div>
	<div class="lamp-item lamp-middle"></div>
	<div class="lamp-item lamp-bottom"></div>
	{turn ? <div class="lamp-item lamp-light open"></div> :<div class="lamp-item lamp-light"></div> }
</div>
    </Card>
  );
}
