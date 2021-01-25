import React, { useEffect, useRef } from 'react';

// import { Container } from './styles';

import { Form } from '@unform/web'
// import { Scope } from '@unform/core'
import Input from '../components/input';

import '../styles/pages/loginPage.css'

import loginImage from '../assets/undraw_remotely_2j6y.svg'

import * as Yup from 'yup'

function LoginPage() {

    //#region functions
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

        // dark-mode 
        const [ darkMode, setDarkMode ] = React.useState(getInicialMode())
        useEffect(()=>{
            localStorage.setItem("dark", JSON.stringify(darkMode))
        },[darkMode])

        function getInicialMode(){
            const savedMode = JSON.parse(localStorage.getItem('dark'))

            return savedMode || false;
        }
    //#endregion

    return (
        <div className="login-page">
            
            <div className={darkMode? 'dark-mode': 'light-mode'}>
                <div className='login-page-top'>
                    {/* <img src={}/> */}
                    <span>New user? <a>Sign Up</a></span>
                </div>
                
                <img src={loginImage} className="login-image"/>
                <Form ref={formRef} className="custom-field" onSubmit={handleSubmit}>
                                        
                    <div className="form-title">
                        <h1>Login</h1>
                        <div className='form-toggle'>
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
                        </div>
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

            <a className='form-button-register' type='submit'>Login with</a>
            </div>
            
        </div>
    );
}

export default LoginPage;