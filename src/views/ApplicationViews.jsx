import { Routes,Route, Outlet } from 'react-router-dom'
import { NavBar } from '../components/nav/NavBar.jsx'
import { Welcome } from '../components/welcome/Welcome.jsx'
import { TicketPage } from '../components/tickets/TicketsPage.jsx'
import { CustomerPage } from '../components/customers/CustomerPage.jsx'
import { CustomerDetails } from '../components/customers/CustomerDetails.jsx'
import { EmployeesPage } from '../components/employees/EmployeesPage.jsx'
import { EmployeeDetails } from '../components/employees/EmployeeDetails.jsx'
import { useEffect, useState } from 'react'
import { EmployeeForm } from '../components/forms/EmployeeEdit.jsx'

export const ApplicationViews = () => {
  
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('honey_user')))
  }, [])
  
  return (
    <Routes>
      <Route path='/' element={
        <>
          <NavBar />
          <Outlet />
        </>
      }>

      <Route index element={<Welcome />} />

        <Route path='tickets' element={<TicketPage currentUser={currentUser}/>} />

        <Route path='customers' >
          <Route index element={<CustomerPage />} />
          <Route path=':customerId' element={<CustomerDetails />} />
        </Route>

        <Route path='employees'>
          <Route index element={<EmployeesPage />} />
          <Route path=':employeeId' element={<EmployeeDetails />} />
        </Route>

        <Route path='profile' element={<EmployeeForm currentUser={currentUser}/>}/>

      </Route>
    </Routes>

  )
}
