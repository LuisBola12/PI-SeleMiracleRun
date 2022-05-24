import { useState } from "react";

export const usePostUserFromDatabase = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [id, setID] = useState("");
	const [name, setName] = useState("");
	const [lastname1, setLastName1] = useState("");
	const [lastname2, setLastName2] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const verifyUser = async (Email) => {
		const seleUrl = `http://localhost:4000/users/${Email}`;
		try {
			const response = await fetch(seleUrl);
			const newData = await response.json();
			if(newData.length === 1 || response.status === 400){
				setErrorMessage("User alredy in use");
				return false;
			}else{
				return true;
			}
		} catch (error) {
			setErrorMessage("Please Fill All Fields.");
			return false;
		}
	}

	const verifyEmployee = async (Cedula) => {
		const seleUrl = `http://localhost:4000/employer/${Cedula}`;
		try {
			const response = await fetch(seleUrl);
			const newData = await response.json();
			if(newData.length === 1 || response.status === 400){
				setErrorMessage("User alredy in use");
				return false;
			}else{
				return true;
			}
		} catch (error) {
			setErrorMessage("Please Fill All Fields.");
			return false;
		}
	}

	const registerUser = async () => {
		const user = await verifyUser(email);
		const employee = await verifyEmployee(id);
		console.log(`${user} y ${employee}`)
		if( user === true && employee === true ){
			
			const registerFetch = await fetch('http://localhost:4000/createEmployer', 
			{
					method: 'POST',
					headers: {
							"Content-type": "application/json",
					},
					body: JSON.stringify({
							Cedula : id, 
							Nombre : name, 
							Apellido1 : lastname1, 
							Apellido2 : lastname2, 
							Telefono : phoneNumber,
							Email : email,
							Contrasenia: password,
							Roles: "admin"
					}),
			});
			console.log(registerFetch);
			console.log("llega hasta aqui adentro");
			return true;
		}else{
			return false;
		}
	}

	return {registerUser, email, setEmail, password, setPassword, name, setName, 
		lastname1, setLastName1, lastname2, setLastName2, id, setID, phoneNumber, 
		setPhoneNumber, errorMessage, setErrorMessage};
}
