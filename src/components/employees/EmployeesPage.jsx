import { useEffect, useState } from "react"
import './Employees.css'
import { getStaffUsers } from "../../services/userService.jsx"
import { User } from "../users/User.jsx"
import { Link } from "react-router-dom"

export const EmployeesPage = () => {
    

    const [staffUsers, setStaffUsers] = useState([])

    useEffect(() => {
        getStaffUsers().then((res) => setStaffUsers(res))
    },[])

    return (
        <div className="employees">
            {staffUsers.map((user) => (
                <Link to={`/employees/${user.id}`} key={user.id}>
                    <User user={user}/>
                </Link>
            ))}
        </div>
    )
}