import { Outlet } from "react-router-dom";
import Chats from "../Chats";

const MainContent = ({openChat, toOpenChat, addedMessage}) => {
    
    return (            
        <div className="content">
            <div className="content__chats">
                <Chats openChat={openChat} addedMessage={addedMessage}/> 
            </div>
            <div className="content__messages" toopen={toOpenChat}>
               <Outlet /> 
            </div>
        </div>
    )     
}   

export default MainContent;