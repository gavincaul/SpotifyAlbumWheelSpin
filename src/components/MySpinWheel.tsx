import React, { useEffect, useState } from "react";
import { SpinWheel, ISpinWheelProps, ISegments} from "spin-wheel-game";
import fetch from 'node-fetch';
import ImageOverlay from "./ImageOverlay.tsx";


const MySpinWheel = ({ code }) => {
  const [segment, setSegment] = useState<ISegments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overlaySrc, setOverlaySrc] = useState<string | null>(null);
  const [albumCovers, SetAlbumCovers] = useState<{}>({});

  

  useEffect(() => {
    const fetchAlbums = async () => {
      try {

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
          return {
            segmentText: `${album.name} - ${album.artists[0].name}`,
            segColor: "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")
          };
        }));
        console.log(segments);
        SetAlbumCovers(albumCovers);
        setSegment(segments);
        setLoading(false); 

      } catch (error) {
        console.error('Error fetching albums:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (code) {
      setLoading(true); 
      fetchAlbums();
    }
  }, [code]);
  
  const handleSpinFinish = (result: string) => {
    console.log(`Spun to: ${result}`);
    setOverlaySrc(albumCovers[result.split('-')[0].trim()]); 
  };

  const closeOverlay = () => {
    setOverlaySrc(null); 
  };

  let segments = segment;

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
  return (
    <>
      <SpinWheel {...spinWheelProps} />
      {overlaySrc && <ImageOverlay src={overlaySrc} onClose={closeOverlay} />}
    </>
  );  
};

export default MySpinWheel;
