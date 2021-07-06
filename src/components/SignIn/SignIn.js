import React from 'react';

import Logo from '../../assets/logo.svg';

import './SignIn.css';

class SignIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			loading: false,
			flashMessage: null
		};

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.signInWithEmailAndPasswordHandler = this.signInWithEmailAndPasswordHandler.bind(this);
	}

	handleEmailChange(e) {
		this.setState({ email: e.target.value });
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}

	signInWithEmailAndPasswordHandler() {

	}

	render() {
		return (
			<div className='sign-in-container'>
				<div className='sign-in'>
					<img src={Logo} className='logo' alt='Expand' />
					<div className='card'>
						<p className='title'>Nice to see you again here 🎉</p>
						{this.state.flashMessage && (
							<div className='flash-message'>
								<p>Your email or password may be wrong or you don't have an account yet</p>
							</div>
						)}
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
							onClick={this.signInWithEmailAndPasswordHandler}
							disabled={this.state.loading}
						>
							{!this.state.loading ? (
								<p>Sign In</p>
							): (
								<p>Getting Expand ready for you...</p>
							)}
						</button>
					</div>
					<br/>
					<a className='sub-text' href='/sign-up'>Don't have an account yet? Register now for free</a>
				</div>
			</div>
		)
	}
}

export default SignIn;
