import DateFnsAdapter from "@date-io/date-fns";

const Chat = ({receiver, messages}) => { 
    const dateFns = new DateFnsAdapter(); 

    const sortMessages = () => {
        let sortMess = messages.sort((a, b) => {
            let dateA = new Date(a.sendTime);
            let dateB = new Date(b.sendTime);
            return dateB - dateA
        });
        return sortMess;
    }
    
    let myMessages = messages.length === 0 ? "" : sortMessages(); 
    
    let myDate = messages.length === 0 ? "" : myMessages[0].sendTime;

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
                <h5>{receiver.userName}</h5>
                {messages.length === 0 ? "" : <p>{messages[0].body}</p> }
            </div>
            <div className="chat__date">
                <p> {myDate}</p>
            </div>        
        </div>
    )
}

export default Chat;