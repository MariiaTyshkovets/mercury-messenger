const Header = () => {
    
    return (            
        <header className="header"> 
            <div className="header__logo">
                <img src={require("../../assets/images/logo.png")} alt="mercury messanger logo" title="pizza logo"/>
            </div>
            <div className="header__title">
                <h4>Mercury Messenger</h4>
            </div>
        </header>
    )     
}   

export default Header;