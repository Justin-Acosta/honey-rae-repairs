import './NavBar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const NavBar = () => {

    const navigate = useNavigate()

    return (
        <ul className='navbar'>

            <li className='navbar-item'>
                <Link to="/tickets" className='navbar-link'>Tickets</Link>
            </li>

            <li className='navbar-item'>
                <Link to='/customers' className='navbar-link'>Customers</Link>
            </li>

            <li className='navbar-item'>
                <Link to='/employees' className='navbar-link'>Employees</Link>
            </li>

            <li className='navbar-item'>
                <Link to='/profile' className='navbar-link'>Profile</Link>
            </li>

            {localStorage.getItem("honey_user") ? (
                <li className="navbar-item navbar-logout">
                    <Link
                        className="navbar-link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", { replace: true })
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                ""
            )}


        </ul>
    )

}
