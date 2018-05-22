// @flow
import React, {Component} from 'react'
import {
	Form,
	Header,
	Message,
	Button,
	Divider,
	Segment,
	Accordion
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {reduxForm, Field, FieldArray} from 'redux-form'
import {FormattedMessage} from 'react-intl'

import {InputField} from '../../components/formControls'
import FieldRepeater from '../../components/fieldRepeater'
import NameParts from '../../components/NameParts'
import VariantNames from '../../components/VariantNames'

import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'

import type {FormProps} from 'redux-form'

import 'react-widgets/dist/css/react-widgets.css'

Moment.locale('en')
momentLocalizer()

const nameOptions = [
	{key: 'forename', text: 'Forename', value: 'forename'},
	{key: 'surname', text: 'Surname', value: 'surname'},
	{key: 'generational', text: 'Generational', value: 'generational'},
	{key: 'role', text: 'Role', value: 'role'}
]

const variantOptions = [
	{key: 'birth', text: 'birth', value: 'birth'},
	{key: 'married', text: 'married', value: 'married'},
	{key: 'indexed', text: 'indexed', value: 'indexed'},
	{key: 'pseudonym', text: 'pseudonym', value: 'pseudonym'},
	{key: 'nickname', text: 'nickname', value: 'nickname'},
	{key: 'religious', text: 'religious', value: 'religious'},
	{key: 'royal', text: 'royal', value: 'royal'},
	{key: 'self-constructed', text: 'self-constructed', value: 'self-constructed'},
	{key: 'styled', text: 'styled', value: 'styled'},
	{key: 'titled', text: 'titled', value: 'titled'},
	{key: 'orlando_standard', text: 'orlando standard', value: 'orlando_standard'},
	{key: 'descriptive', text: 'descriptive', value: 'descriptive'},
	{key: 'popular', text: 'popular', value: 'popular'},
	{key: 'acronym', text: 'acronym', value: 'acronym'},
	{key: 'alternate', text: 'alternate', value: 'alternate'},
	{key: 'deprecated', text: 'deprecated', value: 'deprecated'},
	{key: 'historic', text: 'historic', value: 'historic'}
]

const projectOptions = [
	{key: 'ww', text: 'Women Writers', value: 'ww'},
	{key: 'isicily', text: 'I.Sicily', value: 'isicily'},
	{key: 'smith', text: 'Smith', value: 'smith'}
]

type Props = FormProps

class PersonComponent extends Component<Props, State> {
	render () {
		const RepeatableNoteComponent = ({field}) =>
			(
				<Field
					width={12}
					name={`${field}.value`}
					component={InputField}
					placeholder="Add your note here."/>
			)

		const RepeatableSameAsComponent = ({field}) =>
			(
				<Field
					width={12}
					name={`${field}.value`}
					component={InputField}
					placeholder="e.g., http://viaf.org/3323"/>
			)

		const renderDatePicker = ({input: {onChange, value}, showTime}) => (
			<DateTimePicker
				onChange={onChange} value={!value ? null : new Date(value)}
				format="DD MMM YYYY"
				time={showTime}
			/>
		)

		const NamePanels = [
			{
				title: 'Standard Name',
				content: {
					content: (
						<Segment>
							<Field key="standard-name" required
								placeholder="e.g. Last Name, First Name (for indexing purposes)"
								name="standard-name"
								label="Standard Name"
								component={InputField}
							/>
							<Divider horizontal>Components</Divider>
							<NameParts name="standard" nameOptions={nameOptions}/>
						</Segment>
					),
					key: 'standardNamePanel'
				}
			},
			{
				title: 'Variant Name(s)',
				content: {
					content: (<div>
						<FieldArray
							name="variants"
							component={VariantNames}
							variantOptions={variantOptions}
							projectOptions={projectOptions}
							nameOptions={nameOptions}></FieldArray>
					</div>),
					key: 'variantPanel'
				}
			},
			{
				title: 'Same As',
				content: {
					content: (<FieldRepeater
						fieldArrayName="sameAs"
						componentLabel='sameAs'
						RepeatableComponent={RepeatableSameAsComponent}
					/>),
					key: 'sameAsPanel'
				}
			}
		]

		const DescriptionPanels = [
			{
				title: 'Important Dates',
				content: {
					content: (<Segment>
						<Field name="date" showTime={false} component={renderDatePicker} />
					</Segment>),
					key: 'datePanel'
				}
			},
			{
				title: 'Properties',
				content: {
					content: (<Segment>Properties??  ah the various dropdowns</Segment>),
					key: 'propPanel'
				}
			},
			{
				title: 'General Notes',
				content: {
					content: (<FieldRepeater
						fieldArrayName="generalNotes"
						componentLabel='note'
						RepeatableComponent={RepeatableNoteComponent}
					/>),
					key: 'genNotePanel'
				}
			},
			{
				title: 'Project Specific Notes',
				content: {
					content: (<Segment>VIAF Lookup</Segment>),
					key: 'projNotePanel'
				}
			}
		]

		const {handleSubmit, invalid, submitting} = this.props

		return (
			<Form onSubmit={handleSubmit} error={invalid}>
				<Header as="h2">
					<FormattedMessage id="Person.identity"/>
				</Header>

				<Accordion defaultActiveIndex={[0]} panels={NamePanels} exclusive={false}/>

				<Header as="h2">
					<FormattedMessage id="Person.description"/>
				</Header>

				<Accordion defaultActiveIndex={[0]} panels={DescriptionPanels} exclusive={false}/>

				<Header as="h2">
					<FormattedMessage id="Person.sources"/>
				</Header>

				<Field key="non_field_errors"
					name="non_field_errors"
					component={({meta: {error}}) => {
						return error ? (
							<Message error>
								<Message.Header>{'Login failed :('}</Message.Header>
								<p>{error}</p>
							</Message>
						) : null
					}}
				/>

				<div style={{textAlign: 'center'}}>
					<Button content="Submit" icon="sign in" loading={submitting}/>
				</div>
			</Form>
		)
	}
}

// i.e. model -> view
const mapStateToProps = state => ({})

// i.e. controller -> view
const mapDispatchToProps = dispatch => ({})

export default reduxForm({form: 'PERSON_FORM'})(
	connect(mapStateToProps, mapDispatchToProps)(PersonComponent)
)
