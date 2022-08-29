import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import chats from "../../assets/chats.json";
import Message from "./Message";

const Messages = ({closeChat}) => {

    const [text, setText] = useState('');

    const params = useParams();
    const myRef = useRef(null);
    const navigate = useNavigate();
    
    let chat = chats.filter(chat => chat.id === +params.id);
    
    useEffect(() => {
        setTimeout(() => {
            myRef.current.scrollIntoView({ block: 'end', behavior: 'auto' });
        }, [600])  
    });

    const handleText = (e) => {
        setText(e.target.value);
    }

    return (            
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
                    <h4>{chat[0].receiver.username}</h4>
                </div>
            </header>
            <main className="messages__main">
                <div className="container">
                    {chat[0].messages.map((item, index) => <Message key={`${item.id}${index}`} {...item} idReceiver={chat[0].receiver.id}/>)}
                    <div ref={myRef} className="bottom" />
                </div>
            </main>
            <footer className="messages__footer">
                <label htmlFor="message" className="text">
                    <input type="text" name="message" placeholder="Type your message" value={text} onChange={handleText}/>
                    <svg width="100%" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M470.3,271.15,43.16,447.31a7.83,7.83,0,0,1-11.16-7V327a8,8,0,0,1,6.51-7.86l247.62-47c17.36-3.29,17.36-28.15,0-31.44l-247.63-47a8,8,0,0,1-6.5-7.85V72.59c0-5.74,5.88-10.26,11.16-8L470.3,241.76A16,16,0,0,1,470.3,271.15Z" 
                            fill="none" strokeLinecap="square" strokeLinejoin="miter-clip" strokeWidth="40px"
                        />
                    </svg>
                </label>
            </footer>
        </section>
    )     
}   

export default Messages;