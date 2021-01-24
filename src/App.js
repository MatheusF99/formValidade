import React, { useEffect, useRef, useState } from 'react'
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

	// dark-mode 
	const [ darkMode, setDarkMode ] = React.useState(getInicialMode())

	useEffect(()=>{
		localStorage.setItem("dark", JSON.stringify(darkMode))
	},[darkMode])

	function getInicialMode(){
		const savedMode = JSON.parse(localStorage.getItem('dark'))

		return savedMode || false;
	}


	return (
		<div className="App">
			<div className={darkMode? 'dark-mode': 'light-mode'}>
				<Form ref={formRef} className="custom-field" onSubmit={handleSubmit}>
					<h1 className='form-title'>Login</h1>

					
					<div>
						<span>☀️</span>
						<span className="toggle">
							<input 
								checked={darkMode}
								onChange={()=>setDarkMode(prevMode=>!prevMode)}
								type="checkbox"
								id="checkbox"
							/>
							<label htmlFor="checkbox"></label>
						</span>
						<span>🌙</span>
					</div>

					<Input type='email' placeholder=" " name="E-mail"/>
					<Input type='password' placeholder=" " name="Password"/>				
					
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

					<button className='form-button' type='submit'>Sign In</button>
				</Form>
			</div>
		</div>		
	);
}

export default App;
