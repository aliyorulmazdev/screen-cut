"use client";
import React, { useState, useEffect, useRef } from "react";
import RotatedPhone from "./RotatedPhone";
import Phone from "./Phone";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CanvasComponent = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isRotated, setIsRotated] = useState(false); // Eklenen kısım: dönüş durumu
  const canvasRef = useRef(null);
  const canvasWidth = 297 * 3.779527559055; // 297mm to pixels
  const canvasHeight = 210 * 3.779527559055; // 210mm to pixels

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleMouseDown = (e) => {
      const canvasBounds = canvas.getBoundingClientRect();

      const handleMouseMove = (e) => {
        const newX = e.clientX - canvasBounds.left;
        const newY = e.clientY - canvasBounds.top;

        // Ensure the icon stays within the canvas boundaries
        let clampedX, clampedY;
        if (isRotated) {
          clampedX = Math.max(0, Math.min(newX, canvasBounds.width - 202));
          clampedY = Math.max(0, Math.min(newY, canvasBounds.height - 407));
        } else {
          clampedX = Math.max(0, Math.min(newX, canvasBounds.width - 407));
          clampedY = Math.max(0, Math.min(newY, canvasBounds.height - 202));
        }

        setPosition({ x: clampedX, y: clampedY });
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    canvas.addEventListener("mousedown", handleMouseDown);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [isRotated]);

  // Eklenen kısım: ikonu döndürme fonksiyonu
  const handleRotateIcon = () => {
    setIsRotated(!isRotated);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: canvasWidth,
          height: canvasHeight,
          border: "1px solid black",
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          style={{ display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            left: position.x,
            top: position.y,
            transform: "translate(0, 0)",
            pointerEvents: "none",
          }}
        >
          {isRotated ? ( // Eğer döndürülmüş durumdaysa RotatedScissorsIcon, değilse ScissorsIcon göster
            <Phone
              width={202}
              height={407}
              className="text-gray-800 dark:text-gray-200"
            />
          ) : (
            <RotatedPhone
              width={407}
              height={202}
              className="text-gray-800 dark:text-gray-200"
            />
          )}
          <div
            style={{
              width: "5px",
              height: "5px",
              backgroundColor: "red",
              position: "absolute",
              top: 0,
              left: 0,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
      <>
        <div
          style={{
            textAlign: "center",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Label>
            Pointer Coordinates: ({Math.floor(position.x)},{" "}
            {Math.floor(position.y)})
          </Label>
          <div style={{ marginTop: "10px" }}>
            <Button onClick={handleRotateIcon}>Rotate</Button>
          </div>
        </div>
      </>
    </>
  );
};

export default CanvasComponent;
