import React from "react";
import sprite from "../assets/pmp_daddy.png";

const PMPDaddy = () => {
  return (
    <div className="w-32 h-32 mx-auto">
      <img
        src={sprite}
        alt="PMP DADDY Sprite"
        className="w-full h-full object-contain"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
};

export default PMPDaddy;
