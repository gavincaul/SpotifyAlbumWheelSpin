import React, { useEffect, /*useState*/ } from "react";
import { SpinWheel, ISpinWheelProps } from "spin-wheel-game";


const MySpinWheel = (code) => {
    //const [albums, setAlbums] = useState([]);

    useEffect(() => {
      const fetchAlbums = async () => {
        try {
          const response = await fetch(`/SpotifyAlbumWheelSpin/api/spotify/?code=${code.code}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          //setAlbums(response);
          console.log(response); 
        } catch (error) {
          console.error(`Error: ${error.message}`);
        }
      };
  
      if (code) {
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

  return <SpinWheel {...spinWheelProps} />;
};

export default MySpinWheel;
