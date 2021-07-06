import React from 'react';
import { navigate } from '@reach/router';

import './Home.css';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				displayName: ' William '
			},
			flashMessage: null
		};

		this.getGreetingsBasedOnTime = this.getGreetingsBasedOnTime.bind(this);
	}

	showFlashMessage(message) {
		this.setState({ message })
	}

	getGreetingsBasedOnTime() {
		const date = new Date();
		const hour = date.getHours();

		if (hour >= 0 && hour <= 13) {
			return `Good morning, ${this.state.user.displayName} ⛅`;
		}else if (hour > 13 && hour <= 18){
			return `Good afternoon, ${this.state.user.displayName} 👋`;
		}else {
			return `Good evening, ${this.state.user.displayName} 🌙`;
		}
	}

	render() {
		const greeting = this.getGreetingsBasedOnTime();

		return (
			<div className='home-container'>
				<div className='home'>
					<header>
						<h1>{greeting}</h1>
						<p>Did you know? At least 20% of your income should go towards your priorities</p>
					</header>
					{this.state.flashMessage && (
						<div className='flash-message'>
							{this.state.flashMessage}
						</div>
					)}
					<section className='summary'>
						<div id='first'>
							<p>Bank account balance</p>
							<p className='value'>$662.56</p>
						</div>
						<div>
							<p>Total plans balance</p>
							<p className='value'>$791.25</p>
						</div>
					</section>

					<section className='how-much'>
						<p>💰 You spent <b>$200.14</b> in the last 7 days</p>
					</section>
					<p className='title'>Putting your savings to work</p>
					<button
						id='plan'
						className='special-btn'
						onClick={() => navigate('/plans')}
					>
						<p>My plans</p>
						<small>Save for your next purchase, trip, and more</small>
					</button>
					{/*
					<button
						className='special-btn'
						onClick={() => navigate()}
					>
						<p>Fulfill my savings plan</p>
						<small>You have already saved 78% of your goal amount</small>
					</button>
					*/}
				</div>
			</div>
		)
	}
}

export default Home;
