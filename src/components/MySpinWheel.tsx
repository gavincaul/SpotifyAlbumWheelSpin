import React, { useEffect, useState } from "react";
import { SpinWheel, ISpinWheelProps, ISegments} from "spin-wheel-game";
import fetch from 'node-fetch';


const MySpinWheel = ({ code }) => {
  const [segment, setSegment] = useState<ISegments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getDominantColor(imageUrl) {
    try {
      const response = await fetch(`https://www.colorthief.io/api/color?url=${encodeURIComponent(imageUrl)}`, []);
      const data = await response.json();
      return data.color;
    } catch (error) {
      console.error('Error fetching dominant color:', error);
      return null;
    }
  }
  
  // Usage example
  const imageUrl = 'https://example.com/path/to/your/image.jpg';
  getDominantColor(imageUrl).then(color => {
    return color
  });




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

        console.log('Fetched response text:', text);

   
        const result = JSON.parse(text);
        console.log('Parsed albums:', result);
        const segments = await Promise.all(result.map(async (album) => {
          const dominantColor = await getDominantColor(album.images[0].url);  // Wait for color
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
  


  

  let segments = segment;


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
  if (loading) {
    return <p>Loading albums...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return <SpinWheel {...spinWheelProps} />;
};

export default MySpinWheel;
