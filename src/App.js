import React, { useRef } from 'react'
import "./styles/App.css";

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
			<h1 className='form-title'>Login</h1>

			<Form ref={formRef} className="custom-field" onSubmit={handleSubmit}>
				
				<Input name="name" required/>
				<Input name="email" required/>				
				
				{/*
				<Scope path="endereço">
					<Input name="rua" required />
					<span class="placeholder">Rua</span><br/>
					<Input name="bairro" required/>
					<span class="placeholder">Bairro</span><br/>
					<Input name="numero" required/>
					<span class="placeholder">Numero</span><br/>
					<Input name="cidade" required/>
					<span class="placeholder">Cidade</span><br/>
					<Input name="estado" required/>
					<span class="placeholder">Estado</span><br/>
				</Scope> */}

				<button className='form-button' type='submit'>Enviar</button>
			</Form>
		</div>		
	);
}

export default App;
