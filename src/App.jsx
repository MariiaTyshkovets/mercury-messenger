import StartPage from "./components/StartPage";
import { Routes, Route } from "react-router-dom";
import AxiosError from "./components/AxiosError";
import NotFoundPage from "./components/NotFoundPage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import MainContent from "./components/MainContent";
import EmptyWindow from "./components/EmptyWindow";
import Messages from "./components/Messages";
import { useState } from "react";

function App() {

  const [toOpenChat, setToOpenChat ] = useState(0);
   

    const openChat = () => {
        setToOpenChat(1);
    }

    const closeChat = () => {
        setToOpenChat(0);
    }

  return (
    <div>
      <Routes>
        <Route path="/mercury-messenger/" element={<StartPage />}>
          <Route name="sign-in" index element={<LogIn />}/>
          <Route name="sign-up" path="sign-up" element={<SignUp />}/>
        </Route>
        <Route path="/mercury-messenger/chats" element={<MainContent openChat={openChat} toOpenChat={toOpenChat} />}>
          <Route name="empty" index element={<EmptyWindow />}/>
          <Route name="chat" path=":id" element={<Messages closeChat={closeChat}/>}/>
        </Route>
        <Route path="/mercury-messenger/error" element={<AxiosError />}/>
        <Route path="/mercury-messenger/*" element={<NotFoundPage />}/>
      </Routes>
    </div>
  );
}

export default App;
