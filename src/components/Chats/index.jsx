import React, { useEffect, useState } from "react";
import Chat from "../Chat";
import chatsFromBack from "../../assets/chats.json";
import user from "../../assets/user.json";
import { NavLink } from "react-router-dom";

const Chats = ({openChat}) => {
    
    const [searchUsername, setSearchUsername] = useState("");
    const [chats, setChats] = useState(chatsFromBack);
    const [newChats, setNewChats] = useState([]);
    
    let activeStyle = {
        fontWeight: "600"
    };

    const inputText = (e) => {
        setSearchUsername(e.target.value);
    }

    useEffect(() => {
        let chatsWithSort = chats.sort((a, b) => {
            let dateA = new Date(a.messages[a.messages.length - 1].date);
            let dateB = new Date(b.messages[b.messages.length - 1].date);
            return dateB - dateA
        });
        let newSortChats = chatsWithSort.filter(item => item.receiver.username.toLowerCase().includes(searchUsername.toLowerCase()));
        setNewChats(newSortChats);   
    }, [searchUsername])

       

    return (            
        <section className="chats">
            <header className="chats__header">
                <div className="user">
                    <div className="user__img">
                        <img src={require("../../assets/images/user-placeholder.png")} alt="user plaseholder" />
                    </div>
                    <h4>{user[0].username}</h4>
                </div>
                <div className="chats__search">
                    <label htmlFor="search" className="search">
                        <img src={require("../../assets/images/search_icon.png")} 
                            alt="search icon" />
                        <input type="search" name="search" id="search" 
                            placeholder="Search or start new chat" 
                            value={searchUsername}
                            onChange={inputText} />
                    </label>
                </div>
            </header>
            <main className="chats__main">
                <div className="chats__title">
                    <h3>Chats</h3> 
                </div>
                <div className="chats__items">
                    { newChats.map((chat, index) => <NavLink key={index} to={`/mercury-messenger/chats/${chat.id}`}
                        style={({ isActive }) => isActive ?  activeStyle : undefined} onClick={openChat}>
                        <Chat {...chat} />
                    </NavLink>) }
                </div>  
            </main>
        </section>
    )     
}   

export default Chats;