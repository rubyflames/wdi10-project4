import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

import {BUDGET, CATEGORY} from './categoryAndBudget';

// import './UserTripSelection.css';

import './example.css';

const WHY_WOULD_YOU = [
	{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(CATEGORY.slice(1));

var UserTripSelections = createClass({
	displayName: 'UserTripSelections',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			disabled: false,
			crazy: false,
			options: CATEGORY,
			value: [],
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
	},
	toggleDisabled (e) {
		this.setState({ disabled: e.target.checked });
	},
	toggleChocolate (e) {
		let crazy = e.target.checked;
		this.setState({
			crazy: crazy,
			options: crazy ? WHY_WOULD_YOU : CATEGORY,
		});
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select className="select"
                multi
                simpleValue
                disabled={this.state.disabled}
                value={this.state.value}
                placeholder="Select your favourite(s)"
                options={this.state.options}
                onChange={this.handleSelectChange} />

				<div className="checkbox-list">
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.disabled} onChange={this.toggleDisabled} />
						<span className="checkbox-label">Disable the control</span>
					</label>
					<label className="checkbox">
						<input type="checkbox" className="checkbox-control" checked={this.state.crazy} onChange={this.toggleChocolate} />
						<span className="checkbox-label">I don't like Chocolate (disabled the option)</span>
					</label>
				</div>
			</div>
		);
	}
});
export default UserTripSelections;
