// import { useEffect, useState } from "react"
// import { getAllEmployees } from "../../services/employeeService.jsx"


// export const Tickets = ({ displayedTickets, currentUser }) => {


//     const [employees, setEmployees] = useState([])


//     useEffect(() => {
//         getAllEmployees().then((res) => setEmployees(res))
//     }, [])

//     // useEffect(() => {
//     //     const foundEmployee = employees.find((employees) => employees.id === filteredTicketsProp.employeeTickets[0].employeeId)
//     //     setAssignedEmployee(foundEmployee)
//     // },[employees])


//     //---OPTIONAL CHAINING OPERATOR(?)---
//     //If the object accessed or function called using this operator is undefined or null, 
//     //the expression short circuits and evaluates to undefined instead of throwing an error.

//     // const foundEmployee = employees.find((employees) => employees.id === ticket.employeeTickets[0]?.employeeId)



//     //---TERNARY OPERATOR EXPRESSION---
//     //checks if foundEmployee is true or false
//     //if true: return foundEmployee.user.fullName
//     //if false: return "None"
//     //***CAUTION***
//     //this is being used because foundEmployee.user was returning undefined
//     //for objects with an empty array assigned to the employeeTickets property

//     // return foundEmployee ? foundEmployee.user.fullName : "None"


//     /*
//     if (currentUser.id === ticket.employeeTickets[0].employeeId) {
//         <button></button>
//     } else {
//         <button></button>
//     }
//     */



//     return (
//         <article className='tickets'>

//             {displayedTickets.map(ticket => {


//                 return (
//                     <section key={ticket.id} className="ticket">
//                         <header className="ticket-info">{ticket.id}</header>
//                         <div>{ticket.description}</div>
//                         <footer>
//                             <div>
//                                 <div>
//                                     <div className="ticket-info">Assignee</div>
//                                     <div></div>
//                                 </div>
//                                 <div className="ticket-info">emergency</div>
//                                 <div>{ticket.emergency ? 'yes' : 'no'}</div>
//                             </div>
//                             <div className="btn-container">
//                                 {/* if the logged in user is employee and no employee ticket matches, create claim button */}
//                                 {/* if user is assigned employee, create close ticket button */}

//                             </div>
//                         </footer>
//                     </section>
//                 )
//             }
//             )}


//         </article>
//     )
// }


import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeService.jsx"
import { getServiceTickets, postEmployeeTicket, updateEmployeeTicket } from "../../services/ticketService.jsx"

export const Ticket = ({ ticket, currentUser, setServiceTickets }) => {
    const [employees, setEmployees] = useState([])
    const [assignedEmployee, setAssignedEmployee] = useState({})


    useEffect(() => {
        getAllEmployees().then((employeeArray) => {
            setEmployees(employeeArray)
        })
    }, [])


    useEffect(() => {
        const foundEmployee = employees.find(employee => employee.id === ticket.employeeTickets[0]?.employeeId)
        setAssignedEmployee(foundEmployee)
    }, [employees, ticket])


    const handleClaim = async () => {

        const foundEmployee = employees.find(employee => employee.userId === currentUser.id)

        const newEmployeeTicket = {
            employeeId: foundEmployee.id,
            serviceTicketId: ticket.id
        }

        // post new employee ticket
        await postEmployeeTicket(newEmployeeTicket)
        // retrieve all tickets again
        await getServiceTickets().then(res => setServiceTickets(res))
    }

    const handleClose = async () => {

        const closedTicket = {
            id: ticket.id,
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date()
        }

        await updateEmployeeTicket(closedTicket)
        await getServiceTickets().then(res => setServiceTickets(res))
    }


    return (
        <section className="ticket" >
            <header className="ticket-info">#{ticket.id}</header>
            <div>{ticket.description}</div>
            <footer>
                <div>
                    <div className="ticket-info">assignee</div>
                    {/* if assigned employee is defined (after initial render), display their name */}
                    <div>{assignedEmployee === !undefined ? assignedEmployee.user?.fullName : "None"}</div>
                </div>
                <div>
                    <div className="ticket-info">Emergency</div>
                    <div>{ticket.emergency === true ? "yes" : "no"}</div>
                </div>
                <div className="btn-container">
                    {/* if the logged in user is employee and no employee ticket matches, create claim button */}
                    {currentUser.isStaff === true && assignedEmployee === undefined ?
                        <button className="btn btn-secondary" onClick={handleClaim}>Claim</button>
                        : ''}
                    {/* if user is assigned employee, create close ticket button */}
                    {currentUser.id === assignedEmployee?.userId && ticket.dateCompleted === '' ?
                        <button className="btn btn-warning" onClick={handleClose}>Close Ticket</button>
                        : ''}
                </div>
            </footer>
        </section>
    )
}