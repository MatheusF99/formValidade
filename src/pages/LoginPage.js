import React, { useEffect, useRef } from 'react';

// unform import
import { Form } from '@unform/web'
import Input from '../components/input';


//style imports
import '../styles/pages/loginPage.css'

//img imports
import loginImage from '../assets/undraw_remotely_2j6y.svg'

//validate importe
import * as Yup from 'yup'


//inicio
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
                <div className="form-container">
                    <Form ref={formRef} className="custom-field" onSubmit={handleSubmit}>


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
                        </div> */}

                        <h1 className="form-title">Login</h1>
                    
                        <div className="input-field">
                            <Input type='email' placeholder=" " name="E-mail"/>
                            <Input type='password' placeholder=" " name="Password"/>
                        </div>		
                        <button className='form-button' type='submit'>Sign In</button>
                        <p className="sign-up-field">You don't have account ? <span>Sign Up</span></p>

                        <div className="social">
                            <p className="social-text">Or Sign In with social plataform</p>
                            <div className="social-midia">
                                <a href="#" className="social-icon">
                                    <i>i</i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i>i</i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i>i</i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i>i</i>
                                </a>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;