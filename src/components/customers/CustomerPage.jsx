import { useEffect, useState } from "react"
import { User } from "../users/User.jsx"
import './Customers.css'
import { Link } from "react-router-dom"
import { getNonStaffUsers } from "../../services/userService.jsx"


export const CustomerPage = () => {

    const [nonStaffUsers, setNonStaffUsers] = useState([])

    useEffect(() => {
      getNonStaffUsers().then((res) => setNonStaffUsers(res))
    }, [])

    return (
        <div className="customers">
            {nonStaffUsers.map((user) => (
                <Link to={`/customers/${user.id}`} key={user.id}>
                    <User user={user} />
                </Link>
            ))}
        </div>
    )
}