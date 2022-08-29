import Header from "../Header";
import { Outlet } from "react-router-dom";


const StartPage = () => {
    
    return (
        <div className="start-page">
            <Header />
            <hr className="start-page__hr"/>
            <div className="start-page__wrapper">
                <Outlet />
            </div>
        </div>
    )     
}   

export default StartPage;