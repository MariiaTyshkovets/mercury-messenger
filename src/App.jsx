import StartPage from "./components/StartPage";
import { Routes, Route } from "react-router-dom";
import AxiosError from "./components/AxiosError";
import NotFoundPage from "./components/NotFoundPage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import MainContent from "./components/MainContent";
import EmptyWindow from "./components/EmptyWindow";
import Messages from "./components/Messages";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./components/Loader";

function App() {

  const [toOpenChat, setToOpenChat ] = useState(0);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const config = {
      method: "get",
      url: "https://mercury-messanger.herokuapp.com/users/",
      headers: {
        'Authorization': '*',
        'Content-Type': 'application/json'
      }
    }

    axios(config).then(res => setUsers(res.data))
    .catch(e => console.log(e)).finally(() => setLoading(!loading));
  }, [])   

  const openChat = () => {
    setToOpenChat(1);
  }

  const closeChat = () => {
    setToOpenChat(0);
  }

  return (
    <div>
      {loading ? <Loader /> 
      : <Routes>
        <Route path="/mercury-messenger/" element={<StartPage />}>
          <Route name="sign-in" index element={<LogIn users={users}/>}/>
          <Route name="sign-up" path="sign-up" element={<SignUp users={users} />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Route>
        <Route path="/mercury-messenger/chats" element={<MainContent openChat={openChat} toOpenChat={toOpenChat} users={users}/>}>
          <Route name="empty" index element={<EmptyWindow />}/>
          <Route name="chat" path=":id" element={<Messages closeChat={closeChat} users={users}/>}/>
        </Route>
        <Route path="/mercury-messenger/error" element={<AxiosError />}/>
      </Routes>}
    </div>
  );
}

export default App;
