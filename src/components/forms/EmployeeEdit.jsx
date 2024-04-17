import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Form.css'
import { getEmployeeById, updateEmployeeDetails } from '../../services/employeeService.jsx'

export const EmployeeForm = ({currentUser}) => {

    const navigate = useNavigate()

    const [currentEmployee, setCurrentEmployee] = useState({specialty: '', rate: ''})
    const [specialtyInput, setSpecialtyInput] = useState('')
    const [hourlyRateInput, setHourlyRateInput] =useState('')

    useEffect(() => {
        getEmployeeById(currentUser.id).then((res) => setCurrentEmployee(res[0]))
    },[currentUser])

    useEffect(() => {
        setSpecialtyInput(currentEmployee.specialty)
    },[currentEmployee])

    
    useEffect(() => {
        setHourlyRateInput(currentEmployee.rate)
    },[currentEmployee])


    const invokeUpdateEmployeeDetails = (event) => {
        // when a button is included as part of a form, the form gets submitted.
        // preventDefault() is overwriting this default behavior.
        event.preventDefault()
        console.log('click')

        const updatedEmployee = {
            id: currentEmployee.id,
            specialty: specialtyInput,
            rate: hourlyRateInput,
            userId: currentEmployee.userId
        }

        updateEmployeeDetails(updatedEmployee).then(() => {
            navigate(`/employees/${currentEmployee.id}`)
        })

    }


    return (
        <form className="profile">

            <h2>Update Profile</h2>

            <fieldset>
                <div className="form-group">
                    <label >Specialty:</label>
                    <input 
                    type="text" 
                    required 
                    className='form-control' 
                    // placeholder={`Current Specialty: ${specialtyInput}`} 
                    value={specialtyInput}
                    onChange={(changeEvent) => setSpecialtyInput(changeEvent.target.value)}/>
                    {/* <input 
                    type="text" 
                    required className='form-control' 
                    value={currentEmployee.specialty} 
                    onChange={(changeEvent) => {
                        const copy = { ...employee}
                        copy.specialty = event.target.value
                        setCurrentEmployee(copy)
                    }}/> */}
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label >Hourly Rate:</label>
                    <input 
                    type="number" 
                    required 
                    className='form-control' 
                    // placeholder={`Current Hourly Rate: ${hourlyRateInput}`} 
                    value={hourlyRateInput}
                    onChange={(changeEvent) => setHourlyRateInput(changeEvent.target.value)}/>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <button className="form-btn btn-primary" onClick={invokeUpdateEmployeeDetails}>Save Profile</button>
                </div>
            </fieldset>

        </form>
    )
}