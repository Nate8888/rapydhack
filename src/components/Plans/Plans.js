import React from 'react';
import Moment from 'react-moment';

import CreatePlan from '../CreatePlan/CreatePlan';

import Echo from '../../assets/echo.gif';
import PlusIcon from '../../assets/plus.svg';

import './Plans.css';

class Plans extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// plans: [],
			plans: [{
				name: 'Echo Smart Speaker',
				price: 599.99,
				img: Echo,
				monthly: 20.14,
				createdAt: new Date().toString()
			}], // @warning: testing purposes only
			loading: true,
			loadingFulfill: false,
			openCreatePlanSection: false,
			showSuccess: false,
			allowFulfill: true
		};

		this.createPlan = this.createPlan.bind(this);
		this.fulfillPlan = this.fulfillPlan.bind(this);
		this.openCreatePlanSection = this.openCreatePlanSection.bind(this);
	}

	componentDidMount() {
		this.setState({ loading: false });
	}

	createPlan(item) {
		const newItem = { ...item, createdAt: new Date()}
		this.setState({
			plans: [...this.state.plans, newItem],
			openCreatePlanSection: false
		});
	}

	openCreatePlanSection() {
		this.setState({ openCreatePlanSection: true })
	}

	fulfillPlan(plan) {
		// Safer than using the ix in the param
		this.setState({ loadingFulfill: true });
		setTimeout(() => {
			const plans = this.state.plans;
			const ix = plans.indexOf(plan);
			if (ix > -1) {
				plans.splice(ix, 1);
			}
			this.setState({ plans, loadingFulfill: false, showSuccess: true });
			setTimeout(() => {
				this.setState({ showSuccess: false });
			}, 5000)
		}, 3000);
	}

	render() {
		let plans = this.state.plans
		const hasPlans = plans && plans.length > 0;

		const fulfillTime = this.state.allowFulfill ? '3 months to go' : 'Savings completed!'
		const fulfillButtonTitle = this.state.allowFulfill
			? 'You haven\'t saved enough yet to fulfill this product'
			: 'Fulfill 🎉'

		const success = (
			<div className='success'>
				<p className='title'>Congratulations ✅</p>
				<p className='cb'>You just earned <span>$18.06</span> in cashback!</p>
				<small>
					We emailed you any additional information, including
					shipping details or tickets at <span>william.fmj@gmail.com</span>
				</small>
			</div>
		)

		if (hasPlans) {
			plans = this.state.plans.map((plan, ix) => {
				return (
					<div className='user-plan' key={ix}>
						<div className='img-container'>
							<img
								src={plan.img}
								alt='Plan product'
								onClick={() => {
									this.setState({ allowFulfill: !this.state.allowFulfill })
								}}
							/>
						</div>
						<section>
							<p className='item-name'>{plan.name}</p>
							<p className='item-price'>
								Full price: ${plan.price}
							</p>
							<p className='item-installment'>
								Your monthly savings: <b>${plan.monthly}</b>
							</p>
							<p className='to-go'>{fulfillTime}</p>
							<p className='item-date'>
								Created on <Moment format="YYYY-MM-DD HH:mm" date={plan.createdAt} />
							</p>
							<button
								disabled={this.state.allowFulfill}
								onClick={(e) => this.fulfillPlan(plan)}
							>
								{this.state.loadingFulfill ? (
									<span>Loading...</span>
								) : (
									<span>{fulfillButtonTitle}</span>
								)}
							</button>
						</section>
					</div>
				)
			})
		}
		return (
			<div className='plans-container'>
				<div className='plans'>
					{hasPlans ? (
						<h1 className='title'>Your active plans</h1>
					) : (
						<h1 className='title'>Plan your savings for free</h1>
					)}
					<small className='sub-title'>Don't pay money to save money!</small>

					<main>
						{hasPlans ? (
							<div className='my-plans'>{plans}</div>
						) : (
							<div className='my-plans'>
								{!this.state.openCreatePlanSection && (
									<button
										className='create'
										onClick={this.openCreatePlanSection}
									>
										<img src={PlusIcon} alt='Add' />
										Create new plan
									</button>
								)}
								{this.state.openCreatePlanSection && (
									<CreatePlan createPlan={this.createPlan}/>
								)}
							</div>
						)}
						{this.state.showSuccess && success}
					</main>
					<div className='footer-bg'></div>
				</div>
			</div>
		)
	}
}

export default Plans;
