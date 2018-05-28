// @flow
import React from 'react'
import {
	Header,
	Grid,
	Button,
	Icon,
	Segment,
	Popup
} from 'semantic-ui-react'
import {Field, FieldArray} from 'redux-form'
import {DropdownComponent} from './FormControls'
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

const DateRepeater = ({
	fieldArrayName,
	componentLabel,
	...rest
}: any) => {
	return (
		<FieldArray
			name={fieldArrayName}
			props={{componentLabel}}
			component={renderSegment}
			{...rest}
		/>
	)
}

const handleDateChange = (dateObj, dateValue) => {
	console.log(dateValue)
}

const renderDatePicker = ({input: {onChange, value}, showTime = false}: any) => (
	<DateTimePicker
		onChange={onChange}
		value={!value ? null : new Date(value)}
		format='YYYY-MM-DD'
		time={showTime}
	/>
)

const renderSegment = ({
	fields,
	RepeatableComponent,
	headerLabel,
	componentLabel,
	meta: {touched, error, submitFailed},
	...rest
}: any) => (
	<Segment>
		<Segment clearing basic style={{padding: 0}}>
			<Header as="h4" floated='left'>{headerLabel}</Header>
			<Button type="button" floated='right' size='tiny' color='olive' onClick={() => fields.push({isRange: true})}>
				<Icon name='plus' />Date Range
			</Button>
			<Button type="button" floated='right' size='tiny' color='olive' onClick={() => fields.push({isRange: false})}>
				<Icon name='plus' />Simple Date
			</Button>
		</Segment>
		{fields.map((name, index) => {
			const isRange = fields.get(index).isRange
			const date1 = null
			const date2 = null
			return (
				<Segment key={index} secondary clearing>
					<Grid>
						<Grid.Column width={15}>
							<Grid>
								<Grid.Row>
									<Grid.Column width={6}>
										<Field
											name={`${name}.date1`}
											value={date1}
											onChange={handleDateChange}
											component={renderDatePicker} />
										<Field
											required
											label='Qualifier'
											name={`${name}.qualifier1`}
											options={dateQualifierOptions}
											placeholder='Qualifier'
											component={DropdownComponent}/>
										{isRange &&
											<div>
												<Field
													name={`${name}.date2`}
													value={date2}
													onChange={handleDateChange}
													component={renderDatePicker} />
												<Field
													required
													label='Qualifier'
													name={`${name}.qualifier2`}
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
											name={`${name}.type`}
											options={dateTypeOptions}
											placeholder='Date type'
											component={DropdownComponent}/>
										<Field
											label='Certainty'
											name={`${name}.cert`}
											options={certaintyOptions}
											placeholder='Certainty'
											component={DropdownComponent}/>
									</Grid.Column>
									<Grid.Column width={6}>
										<Field
											name={`${name}.note`}
											component="textarea"
											rows={3}
											placeholder="Note"/>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Grid.Column>
						<Grid.Column width={1}>
							<Popup size='tiny' position='right center' trigger={
								<Button type="button" floated="right" size='tiny' color='red' icon='minus' onClick={() => fields.remove(index)}/>
							} content={`Remove ${componentLabel}`} />
						</Grid.Column>
					</Grid>
				</Segment>
			)
		})}
	</Segment>
)

export default DateRepeater
