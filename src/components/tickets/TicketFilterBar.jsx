

export const TicketFilterBar = ({setShowEmergencyOnly, setSearchInput}) => {

    return (
        <div className="filter-bar">

        <div>
          <button className="filter-btn btn-primary" onClick={() => setShowEmergencyOnly(true)}>Emergency</button>
          <button className="filter-btn btn-primary" onClick={() => setShowEmergencyOnly(false)}>Show All</button>
        </div>

        <input className='ticket-search' type="text" placeholder="Search Tickets" onChange={(changeEvent) => setSearchInput(changeEvent.target.value)}/>

      </div>
    )
}