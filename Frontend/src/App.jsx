/* eslint-disable no-unused-vars */
import './App.css';
import SignUp from './Components/SignUp';
import { Routes, Route } from "react-router-dom";
import SignIn from './Components/SignIn';
import { useSelector } from 'react-redux';
import ChatPage from './Components/ChatPage';
import Navbar from './Components/Navbar';
import History from "./Components/History";
import NoAuth from './Components/NoAuth';

function App() {
  const mystate = useSelector((state) => state.UserReducer);

  return (
    <div className='w-[100vw] p-0 m-0 h-screen'>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<SignUp />} />
        <Route exact path="/login" element={<SignIn />} />
        {console.log(mystate)}
        {mystate && mystate.username ? (
          <>
            <Route exact path="/home" element={<ChatPage />} />
            <Route exact path="/history" element={<History />} />
          </>
        ) : (
          <>
            {/* <Route path="*" element={<NoAuth/>}/> */}
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;