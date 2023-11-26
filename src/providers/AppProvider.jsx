import React, { useState } from 'react';
import styled from 'styled-components';

const AppContext = React.createContext();

const State = {
    LOADING: 'loading',
    READY: 'ready',
    ERROR: 'error'
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  content-align: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #0D1117;
`;


const Title = styled.h2`

`;

const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState(State.IDLE);
  
  const value = {
    appState, setAppState,
  };


  const StateContainer = ({appState}) => {  
    if(appState === State.LOADING) {
      return (
        <Container>
          <Title>Loading ...</Title>
        </Container>
      );
    }
  
    
    if(appState === State.ERROR) {
      return (
        <Container>
          <Title>Something went wrong </Title>
          <p>( Make sure that NODE_ENV=development to render data )</p>
        </Container>
      );
    }
  
    // ready and all other states
    return (
      null
    );
  }
  
  return (
    <AppContext.Provider value={value}>
      <StateContainer appState={appState}/>
      {children}
    </AppContext.Provider>
  )

};

export default AppProvider;

export { AppContext, AppProvider };