import './App.css';
import {Container} from '@mui/material';
import Header from "./components/Header";
import BridgeSection from "./components/BridgeSection";
import TransactionsSection from "./components/TransactionsSection";

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
