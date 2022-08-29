import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <>
        <section className="not-found">
            <div className="not-found__container">
                <h2>
                    Lost your way?
                </h2>
                <p>Sorry, we can't find that page.</p>
                <p>Follow the link to start your search.</p>
                <div className="btn-container">
                    <Link to='/mercury-messenger/'>
                        <button  className='btn' type="button">
                            Go To Sign In Page
                        </button>
                    </Link>
                </div>
            </div>
        </section>
        </>
    )
}

export default NotFoundPage;