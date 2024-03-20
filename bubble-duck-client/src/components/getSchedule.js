import React,{ useState } from 'react';
import '../styles/components.css';
import { useSelector } from 'react-redux';
import { parseRoutines } from '../utils/responseHelpers';
import Confetti from 'react-confetti';

function useWindowSize() {
  const [size, setSize] = React.useState({ width: window.innerWidth, height: window.innerHeight });

  React.useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export const GetSchedule = () => {
    const scheduleResponse = useSelector(state => state.responses.scheduleResponse);
    const { morningRoutine, nighttimeRoutine } = parseRoutines(scheduleResponse.choices[0].message.content);
    const { width, height } = useWindowSize();
    const [isLoading, setIsLoading] = useState(false);


    return (
      <div className='schedulePageContainer'>
        {isLoading && <p>Loading...</p>}
        <div className='confettiContainer'>
          <Confetti 
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={true}
          gravity={0.02}
        />
        </div>
        <div className='routineContainer'>
          <div className='daytimeRoutine'>
            <img className='schedulePageImage' src='cute-sun.png' alt='Cute Sun' ></img>
            <h2>Morning Schedule</h2>
            {/* Assuming the routines are separated by new lines in the content */}
            {morningRoutine.split('\n').map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
          <div className='nighttimeRoutine'>
            <img className='schedulePageImage' src='cute-moon.png' alt='Cute Moon' ></img>
            <h2>Night Schedule</h2>
            {nighttimeRoutine.split('\n').map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </div>
          {isLoading && (
          <div className='loadingContainer'>
            <img src='bubbles-loading.gif' alt='Loading Bubbles Gif'/>
            <p>Loading...</p>
          </div>
        )}
        </div>
      </div>
    );


  };
  
  