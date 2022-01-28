import styled from "styled-components";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Typing from 'react-typing-animation';

function Statistics() {

    const percentage = 66;

        return (
            <>
                <HomePage>
                    <Cube logo={ribbon}>
                        <Title>Notificaton's</Title>
                        <Typing>
                            <Desc>Welcome to z_t0ht's private file storage website If you've downloaded this using Github please leave a like as I will be updating this everyday</Desc>
                            </Typing>
                    </Cube>
                    <Cube1>
                        <Title>Stats</Title>
                        <Desc1 style={{ width: 250, height: 250, rotation: 1.25, pathColor: "#282847" }}>
                            <CircularProgressbar  />
                        </Desc1>
                        <Desc2 style={{ width: 250, height: 250, rotation: 1.25 }}>
                            <CircularProgressbar />
                        </Desc2>
                    </Cube1>


                </HomePage>
            </>
        )
}

export default Statistics;

const HomePage = styled.div`
  display: block;
  margin-top: 1000px;
  position: center;
`

const Cube = styled.div`
  background-color: #282847;
  padding: 10rem;
  --tw-bg-opacity: 1;
  border-radius: 0.5rem;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  text-align: center;
  bottom: 0;
  width: 25%;
  left: 30px;
  position: absolute;
  height: 20px;

  @media screen and (max-width: 768px) {
    width: 85%;
  }
`


const Cube1 = styled.div`
  background-color: #282847;
  padding: 10rem;
  --tw-bg-opacity: 1;
  border-radius: 0.5rem;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  text-align: center;
  bottom: 0;
  width: 25%;
  right: 30px;
  position: absolute;
  height: 20px;

  @media screen and (max-width: 768px) {
    width: 85%;
  }
`

const Title = styled.h2`
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;
  font-size: 2.25rem;
  line-height: 2.5rem;
  margin-top: -120px;
  text-align: justify-all;
`

const Desc = styled.p`
  font-size: 1.5rem;
  line-height: 2.25rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 10%;
  text-align: center;
  text-buttom: 0px;
`

const Desc1 = styled.p`
  font-size: 1.5rem;
  line-height: 1.25rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 20px;
  text-align: center;
  text-buttom: 20px;
  bottom: 8%;
  right: 65%;
  position: absolute;
  height: 25px;
`

const Desc2 = styled.p`
  font-size: 1.5rem;
  line-height: 1.25rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 50px;
  text-align: center;
  text-buttom: 20px;
  bottom: 8%;
  right: 10%;
  position: absolute;
  height: 25px;
`