export const getServiceTickets = () => {
    return fetch('http://localhost:8088/serviceTickets?_embed=employeeTickets').then(res => res.json())
}

export const postEmployeeTicket = (employeeTicket) => {
    return fetch(`http://localhost:8088/employeeTickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeTicket)
    })
}

export const updateEmployeeTicket = (employeeTicket) => {
    return fetch(`http://localhost:8088/serviceTickets/${employeeTicket.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeTicket)
    })
}