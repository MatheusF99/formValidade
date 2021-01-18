import React from 'react'
import "./App.css";

import { Form } from '@unform/web'
import Input from './components/input';

function App() {

	function handleSubmit(data) {
		console.log(data);
	}

	return (
		<div className="App">
			<h1>Hellow world</h1>

			<Form onSubmit={handleSubmit}>
				<Input name="email"/>
				<Input name="name"/>
				<Input name="password"/>
			</Form>
		</div>		
	);
}

export default App;
