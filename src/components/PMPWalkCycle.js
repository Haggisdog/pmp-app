// File: /src/components/PMPWalkCycle.js

import React, { useEffect, useState } from "react";
import frame1 from "../assets/PM_Pixel_Walk_1.png";
import frame2 from "../assets/PM_Pixel_Walk_2.png";
import frame3 from "../assets/PM_Pixel_Walk_3.png";
import frame4 from "../assets/PM_Pixel_Walk_4.png";
import frame5 from "../assets/PM_Pixel_Walk_5.png";

const frames = [frame1, frame2, frame3, frame4, frame5];
const ANIMATION_SPEED = 240; // ms per frame
const WALK_DURATION = 12000; // same as tailwind walk

export default function PMPWalkCycle() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnimating) {
        setFrameIndex((prev) => (prev + 1) % frames.length);
      }
    }, ANIMATION_SPEED);

    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, WALK_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isAnimating]);

  return (
    <img
      src={frames[frameIndex]}
      alt={`PMP Daddy walking frame ${frameIndex + 1}`}
      style={{
        width: "90px", // scale to fit screen nicely
        height: "auto",
        imageRendering: "pixelated",
      }}
    />
  );
}
