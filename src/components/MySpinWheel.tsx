import React, { useEffect, useState } from "react";
import { SpinWheel, ISpinWheelProps } from "spin-wheel-game";
import fetch from 'node-fetch';


const MySpinWheel = (code) => {
    const [albums, setAlbums] = useState([]);
    console.log(albums)
    useEffect(() => {
      const fetchAlbums = async () => {
        try {
          const response = await fetch(`https://spotify-album-wheel-spin.vercel.app/api/spotify.js?code=${code.code}`, []);
          let result = await new Response(response).json();
          setAlbums(result)
          console.log("RESPONSE", result)
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      };
  
      if (code) {
        fetchAlbums()
      }
    }, [code]); 
  
  


  const segments = [
    { segmentText: "Option 1", segColor: "red" },
    { segmentText: "Option 2", segColor: "blue" },
    { segmentText: "Option 3", segColor: "green" },
  ];

  const handleSpinFinish = (result: string) => {
    console.log(`Spun to: ${result}`);
  };

  const spinWheelProps: ISpinWheelProps = {
    segments,
    onFinished: handleSpinFinish,
    primaryColor: "black",
    contrastColor: "white",
    buttonText: "Spin",
    isOnlyOnce: false,
    size: 290,
    upDuration: 100,
    downDuration: 600,
    fontFamily: "Arial",
    arrowLocation: "top",
    showTextOnSpin: true,
    isSpinSound: true,
  };

  return <SpinWheel {...spinWheelProps} />;
};

export default MySpinWheel;
