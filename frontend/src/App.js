// import logo from './logo.svg';
import './App.css';
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Otp from './otp/Otp';
import Home from './Home/Home';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/verification/:ids' element={<Otp/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
      
    </>
    
  );
}

export default App;
