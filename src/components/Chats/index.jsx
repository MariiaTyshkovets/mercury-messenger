import React, { useEffect, useState } from "react";
import Chat from "../Chat";
// import chatsFromBack from "../../assets/chats.json";
// import user from "../../assets/user.json";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import User from "./User";
import Loader from "../Loader";

const Chats = ({openChat, users}) => {

    let id = sessionStorage.getItem("id");
    
    const [searchUsername, setSearchUsername] = useState("");   
    const [chats, setChats] = useState([]);
    const [myChats, setMyChats] = useState([]);
    const [newChats, setNewChats] = useState([]);
    const [user, setUser] = useState(users[id-1]);
    const [newUsers, setNewUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    let activeStyle = {
        fontWeight: "600"
    };

    const navigate = useNavigate();

    const getChatsFromBack = () => {
        const config = {
            method: "get",
            url: "https://mercury-messanger.herokuapp.com/chats",
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            }
        }

        axios(config).then(res => {console.log(res); setChats(res.data)})
        .catch(err => {
            navigate("/mercury-messenger/error", {state: {error: err.message}})
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getChatsFromBack();
    }, []);

    const inputText = (e) => {
        setSearchUsername(e.target.value);
    }

    useEffect(() => {
        let myChats = chats.filter(item => item.sender.userName === user.userName);
        let chatsWithMessages = myChats.filter(item => item.messages[0]);
        let chatsWithoutMessages = myChats.filter(item => !item.messages[0]);
        let chatsWithSort = chatsWithMessages.sort((a, b) => {
            let dateA = new Date(a.messages[a.messages.length - 1].date);
            let dateB = new Date(b.messages[b.messages.length - 1].date);
            return dateB - dateA
        });
        setMyChats(myChats);
        setNewChats(chatsWithSort.concat(chatsWithoutMessages));
    }, [chats]);

    useEffect(() => {
        let newSortChats = myChats.filter(item => item.receiver.userName.toLowerCase().includes(searchUsername.toLowerCase()));
        let newSortUsers = users.filter(item => item.userName.toLowerCase().includes(searchUsername.toLowerCase()));
        setNewUsers(newSortUsers);
        setNewChats(newSortChats);
    }, [searchUsername])

    const createChat = (receiver) => {
        const data = {
            sender: user,
            receiver: receiver,
        }
        const config = {
            method: "post",
            url: "https://mercury-messanger.herokuapp.com/chats/",
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }

        axios(config).then(res => console.log(res))
        .catch(err => {
            navigate("/mercury-messenger/error", {state: {error: err.message}})
        }).finally(() => {
            setSearchUsername("");
            getChatsFromBack();
        });
    }

    return (   
        <section className="chats">
            {loading ? <Loader />
            :<div className="container">
                <header className="chats__header">
                    <div className="user">
                        <div className="user__img">
                            <img src={require("../../assets/images/user-placeholder.png")} alt="user plaseholder" />
                        </div>
                        <h4>{user.userName}</h4>
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
                        <div className={searchUsername === "" ? "users" : "users show"}>
                            <h4>Users</h4> 
                            { newUsers.map((user, index) => <NavLink key={index} to={`/mercury-messenger/chats/`}
                             onClick={() => createChat(user)}>
                                    <User {...user} />
                                </NavLink>)
                            }
                        </div>
                    </div>
                </main>
            </div>
            }
        </section>
    )     
}   

export default Chats;