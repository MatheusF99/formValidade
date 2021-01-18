import React, { useRef } from 'react'
import "./App.css";

import { Form } from '@unform/web'
import { Scope } from '@unform/core'
import Input from './components/input';


const inicialData ={
	email: 'email@email.com'
}

function App() {

	const formRef = useRef(null)

	function handleSubmit(data) {
		console.log(data);

		if (data.name === "") {
			formRef.current.setError({
				name: 'o nome é obligatorio'
			})
		}
	}

	return (
		<div className="App">
			<h1>Hellow world</h1>

			<Form initialData={inicialData} onSubmit={handleSubmit}>
				<Input name="name"/>
				<Input type="email" name="email"/>

				<Scope path="enderesso">
					<Input name="Rua"/>
					<Input name="Bairo"/>
					<Input name="Numero"/>
					<Input name="Cidade"/>
					<Input name="Estado"/>
				</Scope>

				<button type="submit">Enviar</button>
			</Form>
		</div>		
	);
}

export default App;
