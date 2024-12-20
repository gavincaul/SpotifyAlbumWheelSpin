import React, { useEffect, useState } from "react";
import { SpinWheel, ISegments } from "spin-wheel-game";
import fetch from 'node-fetch';

type Album = {
  name: string;
  artists: { name: string }[];
  images: { url: string }[];
};


const MySpinWheel = ({ code }: { code: string }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [segments, setSegments] = useState<ISegments[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`https://your-api-url/api?code=${code}`, []);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Album[] = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    if (code) {
      fetchAlbums();
    }
  }, [code]);

  useEffect(() => {
    const segmentData = albums.map((album) => ({
      segmentText: album.name,
      segImg: album.images[0]?.url || "",
      segColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generate random color
    }));
    setSegments(segmentData);
  }, [albums]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <SpinWheel
        segments={segments}
        onFinished={(result) => alert(`You landed on: ${result}`)}
        primaryColor="#000000"
        contrastColor="#FFFFFF"
        size={300}
        fontFamily="Arial"
        showTextOnSpin={true}
        isSpinSound={true}
      />
      {segments.length > 0 &&
        segments.map((segment, index) => (
          <div key={index} style={{ textAlign: "center", margin: "10px" }}>
            <p>{segment.segmentText}</p>
            <img
              src={segment.segImg}
              alt={segment.segmentText}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </div>
        ))}
    </div>
  );
};

export default MySpinWheel;
