import * as React from "react";
import Card from "@mui/material/Card";
import "./FanCard.css";

export default function FanCard({ turn }) {
  return (
    <Card
      sx={{
        minWidth: 345,
        maxWidth: 400,
        maxHeight: 380,
        margin: 3,
      }}
    >
      <div class="fan">
        <div class="head">
          <div class="fan__engine"></div>
         {!turn  && <input type="checkbox" id="engine" hidden checked />}
          <div>
            <div class="fan__blades">
              <input type="checkbox" id="engine2" hidden checked />
              <div class="fan__blades">
                <div class="center"></div>
                <div class="blade">
                  <span></span>
                </div>
                <div class="blade">
                  <span></span>
                </div>
                <div class="blade">
                  <span></span>
                </div>
                <div class="blade">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
