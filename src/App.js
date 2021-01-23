import React, { useRef } from 'react'
import "./App.css";

import { Form } from '@unform/web'
import { Scope } from '@unform/core'
import Input from './components/input';

import * as Yup from 'yup'


// const inicialData ={
// 	email: 'email@email.com'
// }

function App() {

	const formRef = useRef(null)

	async function handleSubmit(data, { reset }) {
		console.log(data);
		try{
			const schema = Yup.object().shape({
				name: Yup.string().required('O nome é obrigatorio'),
				email: Yup.string().email('digite um email valido').required('O email é obrigatorio'),
				endereço: Yup.object().shape({
					cidade: Yup.string().min(3,'no minimo 3 caracters').required('a cidade é obrigatoria')
				})
			})
			await schema.validate(data, {
				abortEarly: false
			})

			reset()

			formRef.current.setErrors({})

			alert('cadastro realizdo com sucesso')

		} catch (err){
			if (err instanceof Yup.ValidationError){
				console.log(err)
				const errorMessages ={}

				err.inner.forEach(error => {
					errorMessages[error.path] = error.message
				})

				formRef.current.setErrors(errorMessages)
			}
		}
	}

	return (
		<div className="App">
			<h1>Hellow world</h1>

			<Form ref={formRef} className="custom-field" onSubmit={handleSubmit}>
				
				<Input name="name" required/>
				<span class="placeholder">insert ID</span>
				<Input name="email" required/>

				<Scope path="endereço">
					<Input name="rua" required />
					<Input name="bairro" required/>
					<Input name="numero" required/>
					<Input name="cidade" required/>
					<Input name="estado" required/>
				</Scope>

				<button type="submit">Enviar</button>
			</Form>
		</div>		
	);
}

export default App;
