import React from 'react';
import { Router, navigate } from '@reach/router';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Plans from './components/Plans/Plans';

import './App.css';

class App extends React.Component {
	render() {
		return (
			<div className='App'>
				<Header />
				<Router>
					<Home path='/' />
					<SignIn path='/sign-in' />
					<SignUp path='/sign-up' />
					<Plans path='/plans' />
				</Router>
			</div>
		)
	}
}

export default App;
