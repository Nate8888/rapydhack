import React from 'react';
import { navigate } from '@reach/router';

import HB from '../../assets/hb.svg';
import MiniLogo from '../../assets/mini-logo.svg';
import DefaultClient from '../../assets/default-client.png';

import './Header.css';

class Header extends React.Component {
	render() {
		return (
			<div className='header-container'>
				<div className='header'>
					<img
						className='hb'
						src={HB} alt='Menu'
						onClick={() => navigate('/')}
					/>
					<img className='logo' src={MiniLogo} alt='Logo' />
					<div className='img-container'>
						<img className='client-img' src={DefaultClient} alt='Client' />
					</div>
				</div>
			</div>
		)
	}
}

export default Header;
