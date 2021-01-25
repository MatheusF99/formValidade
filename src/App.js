import React from 'react'
import "./styles/App.css";

import LoginPage from './pages/LoginPage'



// const inicialData ={
// 	email: 'email@email.com'
// }

function App() {

	return (
		<div className="App">
			<div className="container">	
				<div className="form-container">	
					<div className="signIn-signUp">
						<LoginPage />
					</div>		
				</div>		
			</div>		
		</div>		
	);

}

export default App;
