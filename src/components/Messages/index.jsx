import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import Message from "./Message";
import axios from "axios";

const Messages = ({closeChat, users}) => {

    const [text, setText] = useState('');
    const [chat, setChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const id = sessionStorage.getItem("id");
    const user = users[id-1];

    const params = useParams();
    const myRef = useRef(null);
    const navigate = useNavigate();


    const getMessagesFromBack = () => {
        const config = {
            method: "get",
            url: `https://mercury-messanger.herokuapp.com/chats/${params.id}`,
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            }
        }

        axios(config).then(res => {
            setChat(res.data); 
            setMessages(res.data.messages.sort((a, b) => {
                let dateA = new Date(a.sendTime);
                let dateB = new Date(b.sendTime);
                return dateA - dateB
            }))
        }).catch(err => {
            navigate("/mercury-messenger/error", {state: {error: err.message}})
        }).finally(() => {
            setTimeout(() => {
                myRef.current.scrollIntoView({ block: 'end', behavior: 'auto' });
            }, [600])
            setLoading(false);
        });
    }

    useEffect(() => {
        getMessagesFromBack();   
    }, [params.id]);

    const handleText = (e) => {
        setText(e.target.value);
    }

    const answerFromNick = () => {
        
        let joke = ""; 

        const config = {
            method: "get",
            url: "https://api.chucknorris.io/jokes/random",
            headers: {
                'Authorization': '*',
                'Content-Type': 'application/json'
            }
        }

        axios(config).then(res => {
            joke = res.data.value;
        }).catch(e => console.log(e))
        
        setTimeout (() => {
            const data = {
                body: joke,
                sender: chat.receiver 
            }
    
            const configAnswer = {
                method: "post",
                url: `https://mercury-messanger.herokuapp.com/chats/${params.id}/message`,
                headers: {
                    'Authorization': '*',
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(data)
            }
    
            axios(configAnswer).then(res => console.log(res))
            .catch(err => {navigate("/mercury-messenger/error", {state: {error: err.message}})}).finally(() => {
                getMessagesFromBack();
            });    
        }, 10000)
        
    }

    const sendMessage = (e) => {
        e.preventDefault();
        
        const data = {
            body: text,
            sender: user
        }

        const config = {
            method: "post",
            url: `https://mercury-messanger.herokuapp.com/chats/${params.id}/message`,
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
            getMessagesFromBack();
            setText("");
            answerFromNick();
        });
    }

    return (            
        <div>
            {loading ? <Loader/> :
            <section className="messages">
                <header className="messages__header">
                    <div className="arrow-back" onClick={() => {closeChat(); navigate("/mercury-messenger/chats")}}>
                        <svg width="512px" height="512px" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/>
                        </svg>
                    </div>
                    <div className="user">
                        <div className="user__img">
                            <img src={require("../../assets/images/user-placeholder.png")} alt="user plaseholder" />
                        </div>
                        <h4>{chat.receiver.userName}</h4>
                    </div>
                </header>
                <main className="messages__main">
                    <div className="container">
                        {messages.map((item, index) => <Message key={`${item.id}${index}`} {...item} idReceiver={chat.receiver.id}/>)}
                        <div ref={myRef} className="bottom" />
                    </div>
                </main>
                <footer className="messages__footer">
                    <label htmlFor="message" className="text">
                        <input type="text" 
                            name="message" 
                            placeholder="Type your message" 
                            value={text} 
                            onChange={handleText}
                            onKeyPress={(event) => {
                                if (event.key === "Enter" && text.length > 0) {
                                    sendMessage(event);
                                }
                            }} />
                        <svg width="100%" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" onClick={sendMessage}>
                            <path d="M470.3,271.15,43.16,447.31a7.83,7.83,0,0,1-11.16-7V327a8,8,0,0,1,6.51-7.86l247.62-47c17.36-3.29,17.36-28.15,0-31.44l-247.63-47a8,8,0,0,1-6.5-7.85V72.59c0-5.74,5.88-10.26,11.16-8L470.3,241.76A16,16,0,0,1,470.3,271.15Z" 
                                fill="none" strokeLinecap="square" strokeLinejoin="miter-clip" strokeWidth="40px"
                            />
                        </svg>
                    </label>
                </footer>
            </section>}
        </div>
    )     
}   

export default Messages;