import React,{useState} from "react";

export const CreateEmployee = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [lastname,setLastName] = useState('');
    const [id,setID] = useState('');
    const [contract,setContract] = useState('');
    const [hWage,setHWage] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [address,setAddress] = useState('');
  return (
    <>
      <form>
        <div className="user-body">
          <div className="form-group has-feedback">
            <label htmlFor="email">Email: </label>
            <input type="text" id="email" placeholder="Enter an Email Address" 
            value = {email}onChange={(e)=>setEmail(e.target.value)}/>
            <label htmlFor="password">Password: </label>
            <input type="text" id="password" placeholder="Enter a Password"
            value = {password}onChange={(e)=>setPassword(e.target.value)}/>
            <label htmlFor="name">First Name: </label>
            <input type="text" id="name" placeholder="Enter First Name"
            value = {name}onChange={(e)=>setName(e.target.value)}/>
            <label htmlFor="last-name">Last Name: </label>
            <input type="text" id="last-name" placeholder="Enter Last Name"
            value = {lastname}onChange={(e)=>setLastName(e.target.value)}/>
            <label htmlFor="id-card">ID Card: </label>
            <input type="text" id="id-card" placeholder="Enter an ID Card"
            value = {id}onChange={(e)=>setID(e.target.value)}/>
            <label htmlFor="contract">Type of Contract: </label>
            <select className="dropdown-Contract" name="Contract" id="Contract"
            onSelect={(e)=>setContract(e.target.value)}>
                <option value="Tiempo Completo">Tiempo Completo</option>
                <option value="Medio Tiempo">Medio Tiempo</option>
                <option value="Por Horas">Por Horas</option>
                <option value="Servicios Profesionales">Servicios Profesionales</option>
              </select>
            <label htmlFor="hourly-wage">Hourly Wage: </label>
            <input type="text" id="hourly-wage" placeholder="Enter a Hourly Wage"
            value = {hWage}onChange={(e)=>setHWage(e.target.value)}/>
            <label htmlFor="phone-number">Phone Number: </label>
            <input type="text" id="phone-number" placeholder="Enter a Phone Number"
            value = {phoneNumber}onChange={(e)=>setPhoneNumber(e.target.value)}/>
            <label htmlFor="address">Address: </label>
            <input type="text" id="address" placeholder="Enter an Address"
            value = {address}onChange={(e)=>setAddress(e.target.value)}/>
          </div>
        </div>
      </form>
    </>
  );
};
