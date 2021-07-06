import React from 'react';
import { navigate } from '@reach/router';

import LogoPNG from '../../assets/logo-not-svg.png';
import Bank from '../../assets/bank.svg';
import Magnifier from '../../assets/magnifier.svg';
import DefaultClient from '../../assets/default-client.png';

import './Footer.css';

class Footer extends React.Component {
	render() {
		return (
			<div className='footer'>
				<button>
					<img className='logo' src={LogoPNG} alt='Expand' />
				</button>
				<button onClick={null}>
					<img className='icon' src={Bank} alt='Bank' />
				</button>
				<button onClick={null}>
					<img className='icon-mag' src={Magnifier} alt='Search' />
				</button>
				<button onClick={null}>
					<div className='img-container'>
						<img className='client-img' src={DefaultClient} alt='Client' />
					</div>
				</button>
			</div>
		)
	}
}

export default Footer;
