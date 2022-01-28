import styled from "styled-components";
import Snowfall from 'react-snowfall';
import Wave from 'react-wavify';
import React from 'react';
import './App.css';


import Dropdown from "./components/Dropdown";
import Manager from "./components/Manager";
import Statistics from "./components/Statistics";

function App() {

    return (
        <>
            <Dropdown/>
            <Manager/>
            <Statistics/>

            <WaveContainer>
                <Wave
                    fill="#282847"
                    paused={false}
                    style={{height: 250}}
                    options={{
                        height: 50,
                        amplitude: 45,
                        speed: 0.15,
                        points: 4
                    }}
                />
            </WaveContainer>
        </>
    )
}

export default App;

const WaveContainer = styled.div`
  transform: scaleX(-1);
  bottom: 0;
  width: 100%;
  left: 0;
  position: absolute;
  height: 0;
`;
