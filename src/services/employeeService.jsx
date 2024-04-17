

export const getAllEmployees = () => {
    return fetch('http://localhost:8088/employees?_expand=user').then((res) => res.json())
}

export const getEmployeeById = (userId) => {
    return fetch(`http://localhost:8088/employees?userId=${userId}&_embed=employeeTickets&_expand=user`).then((res) => res.json())
}

export const updateEmployeeDetails = (employeeObject) => {
    return fetch(`http://localhost:8088/employees/${employeeObject.id}`, {
        module: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeObject)
    })
}
