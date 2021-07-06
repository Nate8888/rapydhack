import React from 'react';

import Logo from '../../assets/logo.svg';

import './SignUp.css';

class SignUp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			displayName: '',
			email: '',
			password: '',
			loading: false,
			flashMessage: null
		};

		this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.signUpWithEmailAndPasswordHandler = this.signUpWithEmailAndPasswordHandler.bind(this);
	}

	signUpWithEmailAndPasswordHandler() {

	}

	handleDisplayNameChange(e) {
		this.setState({ displayName: e.target.value });
	}

	handleEmailChange(e) {
		this.setState({ email: e.target.value });
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}

	render() {
		return (
			<div className='sign-up-container'>
				<div className='sign-up'>
					<img src={Logo} className='logo' alt='Expand' />
					<div className='card'>
						<p className='title'>Welcome to KeepUp 😉</p>
						{this.state.flashMessage && (
							<div className='flash-message-warning'>
								<p>{this.state.flashMessage}</p>
							</div>
						)}
						<input
							type='text'
							name='displayName'
							placeholder='E.g.: Michael Scott'
							required
							maxLength='15'
							autoComplete='off'
							value={this.state.displayName}
							onChange={this.handleDisplayNameChange}
						/>
						<br />
						<input
							type='text'
							name='email'
							placeholder='E.g.: michaelscott@hotmail.com'
							required
							autoComplete='off'
							value={this.state.email}
							onChange={this.handleEmailChange}
						/>
						<br />
						<input
							type='password'
							name='password'
							placeholder='Your password'
							required
							value={this.state.password}
							onChange={this.handlePasswordChange}
						/>
						<br />
						<button
							className='default-button'
							onClick={this.signUpWithEmailAndPasswordHandler}
							disabled={this.state.loading}
						>
							{!this.state.loading ? (
								<p>Sign Up</p>
							) : (
								<p>Preparing Keepup for you...</p>
							)}
						</button>
					</div>
					<br/>
					<a className='sub-text' href='/sign-in'>Already have an account? Sign in here</a>
				</div>
			</div>
		)
	}
}

export default SignUp;
