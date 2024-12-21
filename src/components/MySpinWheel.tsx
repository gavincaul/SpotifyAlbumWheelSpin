import React, { useEffect, useState } from "react";
import { SpinWheel, ISpinWheelProps, ISegments} from "spin-wheel-game";
import fetch from 'node-fetch';
import ColorThief from "colorthief";


const MySpinWheel = ({ code }) => {
  const [segment, setSegment] = useState<ISegments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  // Usage example


  const rgbToHex = ([r, g, b]: number[]): string =>
    `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

  const getDominantColor = async (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Ensure CORS compliance
      img.src = imageUrl;

      img.onload = () => {
        try {
          const rgb = ColorThief.getColor(img);
          console.log("Color", rgb)
          resolve(rgb);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = reject;
    });
  };


  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        console.log('Fetching albums with code:', code);

        const response = await fetch(`https://spotify-album-wheel-spin.vercel.app/api/spotify.js?code=${code}`, []);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }


        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let text = '';
        let done = false;


        while (!done) {
          const { value, done: chunkDone } = await reader.read();
          done = chunkDone;
          text += decoder.decode(value, { stream: true });
        }

       

        let albumCovers = {}
        const result = JSON.parse(text);
        console.log('Parsed albums:', result);
        const segments = await Promise.all(result.map(async (album) => {
          albumCovers[album.name] = [album.images[0].url, album.externalURL.spotify]
          const dominantColor = await getDominantColor(album.images[0].url);  

          return {
            segmentText: `${album.name}\n${album.artists[0].name}`,
            segColor: dominantColor || "#000000"  // Use black if no color is found
          };
        }));
        setSegment(segments);
        setLoading(false); 

      } catch (error) {
        console.error('Error fetching albums:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (code) {
      setLoading(true); // Start loading when code is present
      fetchAlbums();
    }
  }, [code]);
  
  const ImageOverlay = (src) => {
    const [visible, setVisible] = useState(true);
  
    const handleClick = () => {
      setVisible(false);
    };
  
    if (!visible) return null;
  
    return (
      <div
        onClick={handleClick}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        }}
      >
        <img
          src={src}
          alt="Preview"
          style={{
            maxWidth: "90%",
            maxHeight: "90%",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
            cursor: "pointer",
          }}
        />
      </div>
    );
  };

  

  let segments = segment;


  const handleSpinFinish = (result: string) => {
    console.log(`Spun to: ${result}`);
    ImageOverlay(result)
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
  if (loading) {
    return <p>Loading albums...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return <SpinWheel {...spinWheelProps} />;
};

export default MySpinWheel;
