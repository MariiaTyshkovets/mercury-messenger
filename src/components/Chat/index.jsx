import DateFnsAdapter from "@date-io/date-fns";

const Chat = ({receiver, messages}) => { 
    const dateFns = new DateFnsAdapter(); 
    
    let myDate = messages.length === 0 ? "" : messages[messages.length-1].date;

    if (myDate) {
        const initialDateFnsDate = dateFns.date(myDate);
        myDate = dateFns.format(initialDateFnsDate, "fullDate");
    } 

    return (
        <div className='chat'>
            <div className="chat__user-img">
                <img src={require("../../assets/images/user-placeholder.png")} alt="user plaseholder" />
            </div>
            <div className="chat__info">
                <h5>{receiver.username}</h5>
                {messages.length === 0 ? "" : <p>{messages[messages.length-1].message}</p> }
            </div>
            <div className="chat__date">
                <p> {myDate}</p>
            </div>        
        </div>
    )
}

export default Chat;