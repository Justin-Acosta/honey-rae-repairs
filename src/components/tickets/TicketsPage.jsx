import { useEffect, useState } from "react"
import { getServiceTickets } from "../../services/ticketService.jsx"
import './Tickets.css'
import { TicketFilterBar } from "./TicketFilterBar.jsx"
import { Ticket } from "./Ticket.jsx"


export const TicketPage = ({ currentUser }) => {

  const [serviceTickets, setServiceTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])
  const [displayedTickets, setDisplayedTickets] = useState([])
  const [searchInput, setSearchInput] = useState('')


  //set serviceTickets to the serviceTickets database
  useEffect(() => {
    getServiceTickets().then(ticketsArray => setServiceTickets(ticketsArray))
  }, [])

  //filter service tickets based on emergency status
  useEffect(() => {
    if (showEmergencyOnly) {
      setFilteredTickets(serviceTickets.filter(ticket => ticket.emergency))
    } else {
      setFilteredTickets(serviceTickets)
    }
  }, [showEmergencyOnly, serviceTickets])

  //set which tickets are being displayed to the user. This useEffect considers 
  //the value of filteredTickets and the search bar input
  useEffect(() => {
    const searchTickets = filteredTickets.filter((ticket) => ticket.description.toLowerCase().includes(searchInput.toLowerCase()))
    setDisplayedTickets(searchTickets)
  }, [filteredTickets, searchInput, serviceTickets])

  
  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <TicketFilterBar setShowEmergencyOnly={setShowEmergencyOnly} setSearchInput={setSearchInput} />
      <article className="tickets">
        {displayedTickets.map((ticket) => {
          return <Ticket ticket={ticket} key={ticket.id} currentUser={currentUser} setServiceTickets={setServiceTickets}/>
        })}

      </article>
    </div>
  )
}
  //html render
  //   return (
  //     <div className='tickets-container'>

  //       <h2>Tickets</h2>

  //       <TicketFilterBar setShowEmergencyOnly={setShowEmergencyOnly} setSearchInput={setSearchInput}/>

  //       <Tickets displayedTickets={displayedTickets} currentUser={currentUser}/>

  //     </div>
  //   )
  // }

