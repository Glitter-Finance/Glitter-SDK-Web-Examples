import React from 'react';
import './App.css';
import {Container, Grid, Paper, Stack, styled} from '@mui/material';
import Header from "./components/Header";
import BridgeSection from "./components/BridgeSection";
import TransactionsSection from "./components/TransactionsSection";

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <div className="App App-header">
      <Container maxWidth="xl">
        <Header/>
      </Container>
      <BridgeSection/>
      <br/>
      <TransactionsSection/>
    </div>
  );
}

export default App;
