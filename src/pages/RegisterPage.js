import React, { useEffect, useRef } from 'react';

// unform import
import { Form } from '@unform/web'
import Input from '../components/input';

//style imports
import '../styles/pages/loginPage.css'

//img imports
// import loginImage from '../assets/undraw_remotely_2j6y.svg'

//validate importe
import * as Yup from 'yup'

function RegisterPage() {

				//validate function
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
				const [ darkMode, setDarkMode ] = React.useState(getInicialMode())
				useEffect(()=>{
						localStorage.setItem("dark", JSON.stringify(darkMode))
				},[darkMode])

				function getInicialMode(){
						const savedMode = JSON.parse(localStorage.getItem('dark'))

						return savedMode || false;
				}
	
	return (

		<div className="login-page">
			<div className={darkMode? 'dark-mode': 'light-mode'}>
					
					{/* <img src={loginImage} className="login-image"/> */}
					
					{/* <div className='form-toggle'>
							<span className="form-icon">☀️</span>
							<span className="toggle">
									<input 
											checked={darkMode}
											onChange={()=>setDarkMode(prevMode=>!prevMode)}
											type="checkbox"
											id="checkbox"
									/>
									<label htmlFor="checkbox"></label>
							</span>
							<span className="form-icon">🌙</span>
					</div>  */}

					
				
					<Form ref={formRef} className="custom-field" onSubmit={handleSubmit}>
																	
							<h1 className="form-title">Sign Up</h1>
							
							
							<Input type='text' placeholder=" " name="Name"/>
							<Input type='Email' placeholder=" " name="E-mail"/>				
							<Input type='password' placeholder=" " name="Password"/>				
										
							<button className='form-button' type='submit'>Sign Up</button>
							
					</Form>

			</div>
		</div>
	);
}

export default RegisterPage;