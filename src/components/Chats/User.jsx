const User = ({userName}) => { 
    
    return (
        <div className='user'>
            <div className="user__img">
                <img src={require("../../assets/images/user-placeholder.png")} alt="user plaseholder" />
            </div>
            <div className="user__info">
                <h5>{userName}</h5>
            </div>       
        </div>
    )
}

export default User;