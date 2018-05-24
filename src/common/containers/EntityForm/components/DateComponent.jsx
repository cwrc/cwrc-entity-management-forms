// @flow
import React from 'react'

import {Field} from 'redux-form'
import {
	Segment,
	Grid,
	Dropdown,
	Button
} from 'semantic-ui-react'

import {InputField, DropdownComponent} from './FormControls'

import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'

import {DateTimePicker} from 'react-widgets'

import 'react-widgets/dist/css/react-widgets.css'

Moment.locale('en')
momentLocalizer()

const dateQualifierOptions = [
	{key: 'when-iso', text: 'When', value: 'when-iso'},
	{key: 'from-iso', text: 'From', value: 'from-iso'},
	{key: 'to-iso', text: 'To', value: 'to-iso'},
	{key: 'notBefore-iso', text: 'Not before', value: 'notBefore-iso'},
	{key: 'notAfter-iso', text: 'Not after', value: 'notAfter-iso'}
]

const dateTypeOptions = [
	{key: 'birth', text: 'Birth', value: 'birth'},
	{key: 'death', text: 'Death', value: 'death'},
	{key: 'floruit', text: 'Floruit', value: 'floruit'}
]

const certaintyOptions = [
	{key: 'high', text: 'High', value: 'high'},
	{key: 'medium', text: 'Medium', value: 'medium'},
	{key: 'low', text: 'Low', value: 'low'},
	{key: 'unknown', text: 'Unknown', value: 'unknown'}
]

const DateComponent = ({
	field,
	isRange
}: any) => (
	<Grid>
		<Grid.Row>
			<Grid.Column>
				<Dropdown
					selection
					options={[{value: 'simple', text: 'Simple'}, {value: 'range', text: 'Range'}]}
					onChange={(e, data) => {
						isRange = data.value === 'range'
					}}
				/>
			</Grid.Column>
		</Grid.Row>
		<Grid.Row>
			<Grid.Column width={4}>
				<Field name={`${field}.date`} component={renderDatePicker} />
				<Field
					required
					label='Qualifier'
					name={`${field}.qualifier`}
					options={dateQualifierOptions}
					placeholder='Qualifier'
					component={DropdownComponent}/>
				{isRange &&
					<div>
						<Field name={`${field}.date2`} component={renderDatePicker} />
						<Field
							required
							label='Qualifier'
							name={`${field}.qualifier`}
							options={dateQualifierOptions}
							placeholder='Qualifier'
							component={DropdownComponent}/>
					</div>
				}
			</Grid.Column>
			<Grid.Column width={4}>
				<Field
					required
					label='Type'
					name={`${field}.type`}
					options={dateTypeOptions}
					placeholder='Date type'
					component={DropdownComponent}/>
				<Field
					label='Certainty'
					name={`${field}.cert`}
					options={certaintyOptions}
					placeholder='Certainty'
					component={DropdownComponent}/>
			</Grid.Column>
			<Grid.Column width={8}>
				<Field
					width={8}
					name={`${field}.note`}
					component={InputField}
					placeholder="Note"/>
			</Grid.Column>
		</Grid.Row>
	</Grid>
)

const renderDatePicker = ({
	input: {onChange, value},
	meta: {touched, error},
	...rest
}: any) => (
	<DateTimePicker
		onChange={onChange}
		value={!value ? null : new Date(value)}
		format="YYYY MM DD"
		time={false}
	/>
)

export default DateComponent
