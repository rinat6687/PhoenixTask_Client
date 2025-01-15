import logo from './logo.svg';
import AccountTransaction from './Components/AccountTransaction/AccountTransaction';
import {Slide, ToastContainer} from 'react-toastify'

import './App.css';

function App() {
  return (
    <div className="App">
    <AccountTransaction />
    <ToastContainer rtl position={'top-center'} transition={Slide} style={{marginTop: "20%", width: "450px" }}  />
    </div>
  );
}

export default App;
