import React, { useEffect, useState } from "react";
import { SpinWheel, ISpinWheelProps } from "spin-wheel-game";
import fetch from 'node-fetch';


const MySpinWheel = ({ code }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        console.log('Fetching albums with code:', code);

        // Fetch the data
        const response = await fetch(`https://spotify-album-wheel-spin.vercel.app/api/spotify.js?code=${code.code}`, []);

        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Read the stream and convert it to text
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let text = '';
        let done = false;

        // Read the stream in chunks
        while (!done) {
          const { value, done: chunkDone } = await reader.read();
          done = chunkDone;
          text += decoder.decode(value, { stream: true });
        }

        // Log the received text for debugging
        console.log('Fetched response text:', text);

        // Now parse the text to JSON
        const result = JSON.parse(text);
        console.log('Parsed albums:', result);

        // Set the fetched albums data
        setAlbums(result);
        setLoading(false); // Stop loading once data is fetched

      } catch (error) {
        console.error('Error fetching albums:', error);
        setError(error.message); // Capture error
        setLoading(false); // Stop loading
      }
    };

    if (code) {
      setLoading(true); // Start loading when code is present
      fetchAlbums();
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
  if (loading) {
    return <p>Loading albums...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return <SpinWheel {...spinWheelProps} />;
};

export default MySpinWheel;
