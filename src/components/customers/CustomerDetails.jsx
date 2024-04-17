import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { getCustomerById } from '../../services/customerService.jsx'
import './Customers.css'

export const CustomerDetails = () => {

    const [currentUser,setCurrentUser] = useState([])

    const {customerId} = useParams()

    useEffect(() => {
        getCustomerById(customerId).then((res) => {
            setCurrentUser(res[0])        
        })
    },[customerId])


    return (
        <div className="currentUser">
        <div>
            <div className="currentUser-info">Name</div>
            <div>{currentUser.user?.fullName}</div>
        </div>

        <div>
            <div className="currentUser-info">Address</div>
            <div>{currentUser.address}</div>
        </div>

        <div>
            <div className="currentUser-info">Phone Number</div>
            <div>{currentUser.phoneNumber}</div>
        </div>

        <div> 
            <div className="currentUser-info">Email</div>
            <div>{currentUser.user?.email}</div>
        </div>
    </div>
    )

}