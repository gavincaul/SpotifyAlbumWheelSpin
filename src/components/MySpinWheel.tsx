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
  const [noAlbums, setNoAlbums] = useState(false);
  const [size, setSize] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setSize(150);
      } else if (window.innerWidth < 1024) {
        setSize(200); 
      } else {
        setSize(300); 
      }
    };


    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const cachedSegment = localStorage.getItem('segment');
        const cachedAlbumCovers = localStorage.getItem('albumCovers');
        
        if (cachedSegment && cachedAlbumCovers) {
          console.log("Albums received from cache");
          setSegment(JSON.parse(cachedSegment));
          SetAlbumCovers(JSON.parse(cachedAlbumCovers));
          setLoading(false);
          return;
        }
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

       

        
        const result = JSON.parse(text);
        console.log('Parsed albums:', result);
        if (result.length === 0) {
          setNoAlbums(true); 
          setLoading(false);   
          return;
        }
        const segments = await Promise.all(result.map(async (album) => {
          albumCovers[album.name] = [album.images[0].url, album.externalURL.spotify, album.name + " - " + album.artists[0].name]
          return {
            segmentText: `${album.name} - ${album.artists[0].name}`,
            segColor: "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0") //random color
          };
        }));
        localStorage.setItem('segment', JSON.stringify(segments));
        localStorage.setItem('albumCovers', JSON.stringify(albumCovers));

        SetAlbumCovers(albumCovers);
        setSegment(segments);
        console.log(segments);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
  

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  const handleSpinFinish = async (result: string) => {
    await sleep(1000);
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
    size: size,
    upDuration: Math.floor(Math.random() * (6 - 1 + 1)) + 100,
    downDuration: Math.floor(Math.random() * (1000 - 300 + 1)) + 300,
    fontFamily: "Arial",
    arrowLocation: "top",
    showTextOnSpin: true,
    isSpinSound: true,
    segmentTextFontSize: `${Math.min(20, size / segments.length)}px`,
  };
  if (loading) {
    return <p>Loading albums...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (noAlbums) {
    return <p>No saved albums</p>;
  }


  return (
    <>
      <SpinWheel {...spinWheelProps} />
      {overlaySrc && <ImageOverlay src={overlaySrc} onClose={closeOverlay} />}
    </>
  );  
};

export default MySpinWheel;
