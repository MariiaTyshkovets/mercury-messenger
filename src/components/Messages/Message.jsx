import DateFnsAdapter from "@date-io/date-fns";

const Message = ({sender, idReceiver, body, sendTime}) => { 
    
    const dateFns = new DateFnsAdapter(); 
    
    let myDate = sendTime;

    if (myDate) {
        let date = new Date(myDate + "Z").toISOString();
        const initialDateFnsDate = dateFns.date(date);
        myDate = dateFns.format(initialDateFnsDate, "keyboardDateTime");
    } 

    return (
        
        <div>
            {sender.id === idReceiver ?  
            <div className='message'>
                <div className="message__user-img">
                    <img src={require("../../assets/images/user-placeholder.png")} alt="user plaseholder" />
                </div>
                <div className="message__text">
                    <div className="container">
                        <p>{body}</p>
                    </div>
                </div>
                <div></div>
                <div className="message__date">
                    <p>{myDate}</p>
                </div>
            </div>
            : 
            <div className='message sender'>
                <div className="message__text">
                    <div className="container">
                        <p>{body}</p>
                    </div>
                </div>
                <div className="message__date">
                    <p>{myDate}</p>
                </div>
            </div>
            }
        </div>
    )
}

export default Message;