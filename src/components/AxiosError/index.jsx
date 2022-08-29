import { Link, useLocation } from "react-router-dom";

const AxiosError = () => {
    let location = useLocation();
    let error = location.state === null ? 'There are no axios issues right now.' : location.state.error;
    
    return (
        <>
            <section className='error'>
                <div className="error__container">
                    <h3>{error}</h3>
                    <p>
                        If you want to chat with friends 
                        <span>
                            <Link to='/mercury-messenger/'> Sign In </Link>
                        </span> first. Make sure your Internet is working.
                    </p>
                </div>
            </section>
        </>
    )
}

export default AxiosError;