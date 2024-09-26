import { Link } from "react-router-dom"

//Header
const Header = () => {
    return (
        <header className="Header">
            <h2>Blog Application</h2>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Add Post ➕</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header