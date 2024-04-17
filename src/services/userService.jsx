

export const getNonStaffUsers = () => {
    //users where(?) isStaff is = to false
    return fetch ('http://localhost:8088/users?isStaff=false&_embed=customers').then((res) => res.json())
}

export const getStaffUsers = () => {
    return fetch('http://localhost:8088/users?isStaff=true').then((res) => res.json())
}

