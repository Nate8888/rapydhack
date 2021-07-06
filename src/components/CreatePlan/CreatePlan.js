import React from 'react';
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Echo from '../../assets/echo.gif';
import Mixer from '../../assets/mixer.gif';
import Bose from '../../assets/bose.gif';
import France from '../../assets/paris.gif';
import Toyota from '../../assets/t.png';
import PlusIcon from '../../assets/plus.svg';

import './CreatePlan.css';

const muiTheme = createMuiTheme({
	overrides:{
		MuiSlider: {
			thumb:{
				color: '#1cc959',
			},
			track: {
				color: '#099c3d'
			},
			rail: {
				color: '#828282'
			}
		}
	}
});

class CreatePlan extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			items: // Should mount as: []
				[
					{
						name: 'Echo Smart Speaker',
						price: 599.99,
						img: Echo
					},
					{
						name: 'Trip to France for 3',
						price: 895.12,
						img: France
					},
					{
						name: 'Kitchen Aid Mixer',
						price: 129.12,
						img: Mixer
					},
					{
						name: 'Toyota Camry 2021',
						price: 35200.89,
						img: Toyota
					},
					{
						name: 'Bose Noise Cancelling Headphones',
						price: 199.99,
						img: Bose
					}
				],
			amount: 0,
			loading: true,
			sliderStep: 10,
			sliderMin: 0,
			sliderMax: 0,
			sliderValue: 0,
			selectedItem: null,
			style : {
				opacity: 0,
				transition: 'all 2s ease',
				marginTop: 200
			}
		};

		this.mountStyle = this.mountStyle.bind(this);
		this.fetchItems = this.fetchItems.bind(this);
		this.unmountStyle = this.unmountStyle.bind(this);
		this.onChangeSlider = this.onChangeSlider.bind(this);
		this.onChangeAmount = this.onChangeAmount.bind(this);
		this.handleItemClick = this.handleItemClick.bind(this);
		this.preProcessPlanCreation = this.preProcessPlanCreation.bind(this);
	}

	componentDidMount() {
		this.setState({ loading: false });
		setTimeout(this.mountStyle, 1000);
	}

	fetchItems() {
		setTimeout(() => {
			this.setState({ loading: false });
		}, 3000);
	}

	mountStyle() {
		this.setState({
			style: {
				opacity: 1,
				transition: 'all 1s ease',
				marginTop: 0
			}
		})
	}

	unmountStyle() {
		this.setState({
			style: {
				opacity: 0,
				transition: 'all 1s ease',
				marginTop: 200
			}
		})
	}

	onChangeSlider(e, sliderValue) {
		if (sliderValue) {
			this.setState({ sliderValue });
		}
	}

	onChangeAmount(e) {
		// @TODO: Add better error checking here and input validation
		const income = e.target.value;
		if (income > 5000) return;
		const perc = income * 0.2;

		this.setState({
			amount: income,
			sliderMax: perc,
			sliderValue: (perc / 2).toFixed(2)
		});
	}

	handleItemClick(ix) {
		const selectedItem = this.state.items[ix];
		if (selectedItem) {
			this.setState({ selectedItem });
		}
	}

	preProcessPlanCreation() {
		this.setState({ loading: true });
		setTimeout(() => {
			this.unmountStyle()
			setTimeout(() => {
				this.props.createPlan(this.state.selectedItem)
			}, 2000)
		}, 2000);
	}

	render() {
		let items = [];
		if (this.state.items && this.state.items.length > 0) {
			items = this.state.items.map((item, ix) => {
				return (
					<div
						className='listed-item'
						key={ix}
						onClick={() => this.handleItemClick(ix)}
					>
						<div className='img-container'>
							<img src={item.img} alt='Product' />
						</div>
						<div className='text'>
							<p className='product-name'>{item.name}</p>
							<p className='product-price'>Full Price: <span>${item.price}</span></p>
						</div>
					</div>
				)
			});
		}

		let selectedItem = null
		if (this.state.selectedItem) {
			const item = this.state.selectedItem;
			selectedItem = (
				<div className='selected-item'>
					<div className='image-container'>
						<img src={item.img} alt='Selected Product' />
					</div>
					<div className='text'>
						<p className='product-name'>{item.name}</p>
						<p className='product-price'>Full Price: <span>${item.price}</span></p>
					</div>
				</div>
			)
		}

		return (
			<div className='create-plan' style={this.state.style}>
				<header>
					<p className='title'>Pick the item you'll be saving for:</p>
					<small>Listings provided by Amazon</small>
				</header>
				<div className='info'>
					<label htmlFor='how-much'>How much is your expected monthly income?</label>
					<br />
					<div className='amount-div'>
						<span>$</span>
						<input
							type='number'
							value={this.state.amount}
							onChange={this.onChangeAmount}
							min='10'
							max='5000'
						/>
					</div>
					<br />
					<label htmlFor='slider'>
						Pick your savings plan: <b><span>${this.state.sliderValue}/month</span></b>
					</label>
					<ThemeProvider theme={muiTheme}>
						<Slider
							id='slider'
							defaultValue={0}
							getAriaValueText={this.onChangeSlider}
							aria-labelledby='discrete-slider-small-steps'
							step={this.state.sliderStep}
							marks
							min={this.state.sliderMin}
							max={this.state.sliderMax}
							valueLabelDisplay='auto'
							onChange={this.onChangeSlider}
						/>
					</ThemeProvider>
					<span className='sweet-spot'>Recommended: halfway through the slider</span>
				</div>
				{this.state.selectedItem ? (
					<section>
						<label>Selected item:</label>
						{selectedItem}
					</section>
				) : (
					<section>
						<label htmlFor='list'>Now pick the item you'll be saving towards:</label>
						<div id='list'>{items}</div>
					</section>
				)}
				<div className='shipping-info'>
					<label>Shipping address:</label>
					<input type='text'></input>
					<small>Double check your address since you cannot change once the product has been shipped</small>
				</div>
				<button
					className='create-plan-btn'
					onClick={this.preProcessPlanCreation}
					disabled={this.state.loading}
				>
					{this.state.loading ? (
						<span>Loading...</span>
					) : (
						<span><img src={PlusIcon} alt='Create plan' /> Create plan</span>
					)}
				</button>
			</div>
		)
	}
}

export default CreatePlan;
