import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { getEmployeeById } from "../../services/employeeService.jsx"


export const EmployeeDetails = () => {

    const [currentUser, setCurrentUser] = useState({ user: { fullName: '', email: '' }, specialty: '', rate: 0, employeeTickets: [] })

    const { employeeId } = useParams()

    useEffect(() => {
        getEmployeeById(employeeId).then((res) => setCurrentUser(res[0]))
    }, [employeeId])

    return (
        <div className="currentUser">
        <div>
            <div className="currentUser-info">Name</div>
            <div>{currentUser.user.fullName}</div>
        </div>

        <div> 
            <div className="currentUser-info">Email</div>
            <div>{currentUser.user.email}</div>
        </div>

        <div>
            <div className="currentUser-info">Specialty</div>
            <div>{currentUser.specialty}</div>
        </div>

        <div>
            <div className="currentUser-info">Rate</div>
            <div>{currentUser.rate}</div>
        </div>

        <div>
            <div className="currentUser-info">Tickets</div>
            <div>{currentUser.employeeTickets.length}</div>
        </div>

    </div>
    )

}
