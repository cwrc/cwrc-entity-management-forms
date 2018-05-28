// @flow
import React, {Component} from 'react'
import {
	Form,
	Header,
	Message,
	Grid,
	Button,
	Segment,
	Rail
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {reduxForm, Field, FieldArray} from 'redux-form'
import {FormattedMessage} from 'react-intl'

import {InputField, DropdownComponent} from '../../components/FormControls'
import SegmentRepeater from '../../components/SegmentRepeater'
import DateRepeater from '../../components/DateRepeater'
import NameParts from '../../components/NameParts'
import VariantNames from '../../components/VariantNames'
import DateComponent from '../../components/DateComponent'
import LanguageSelector from '../../components/LanguageSelector'
import ProjectSelector from '../../components/ProjectSelector'
import Values from '../../components/Values'

import type {FormProps} from 'redux-form'

const nameOptions = [
	{key: '', text: '', value: ''},
	{key: 'forename', text: 'Forename', value: 'forename'},
	{key: 'surname', text: 'Surname', value: 'surname'},
	{key: 'generational', text: 'Generational', value: 'generational'},
	{key: 'role', text: 'Role', value: 'role'}
]

const variantOptions = [
	{key: '', text: '', value: ''},
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

const factualityOptions = [
	{key: '', text: '', value: ''},
	{key: 'real', text: 'Real', value: 'real'},
	{key: 'fake', text: 'Fake', value: 'fake'}
]

const certaintyOptions = [
	{key: '', text: '', value: ''},
	{key: 'high', text: 'High', value: 'high'},
	{key: 'medium', text: 'Medium', value: 'medium'},
	{key: 'low', text: 'Low', value: 'low'},
	{key: 'unknown', text: 'Unknown', value: 'unknown'}
]

const genderOptions = [
	{key: '', text: '', value: ''},
	{key: 'cisgender', text: 'cisgender', value: 'cisgender'},
	{key: 'ciswoman', text: 'ciswoman', value: 'ciswoman'},
	{key: 'cisman', text: 'cisman', value: 'cisman'},
	{key: 'woman', text: 'woman', value: 'woman'},
	{key: 'man', text: 'man', value: 'man'},
	{key: 'transgender', text: 'transgender', value: 'transgender'},
	{key: 'transwoman', text: 'transwoman', value: 'transwoman'},
	{key: 'transman', text: 'transman', value: 'transman'},
	{key: 'androgynous', text: 'androgynous', value: 'androgynous'},
	{key: 'genderqueer', text: 'genderqueer', value: 'genderqueer'},
	{key: 'genderselfreported', text: 'genderselfreported', value: 'genderselfreported'}
]

type Props = FormProps

class PersonComponent extends Component<Props, State> {
	render () {
		const DescriptiveNote = ({name}) => (
			<Segment>
				<Grid>
					<Grid.Row>
						<Grid.Column width={16}>
							<LanguageSelector label="Language" name={`${name}.lang`}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={16}>
							<Field
								width={10}
								name={`${name}.value`}
								component='textarea'
								rows={3}
								placeholder="Add your note here."/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		)

		const ProjectNote = ({name}) => (
			<Segment>
				<Grid>
					<Grid.Row>
						<Grid.Column width={8}>
							<ProjectSelector label="Project" name={`${name}.project`}/>
						</Grid.Column>
						<Grid.Column width={8}>
							<LanguageSelector label="Language" name={`${name}.lang`}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={16}>
							<Field
								width={10}
								name={`${name}.value`}
								component='textarea'
								rows={3}
								placeholder="Add your note here."/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		)

		const NationalityComponent = ({name}) => (
			<Segment>
				<Grid>
					<Grid.Column width={10}>
						<Field
							label="Nationality"
							name={`${name}.value`}
							placeholder="Nationality"
							component={InputField}
						/>
					</Grid.Column>
					<Grid.Column width={6}>
						<Field
							label='Certainty'
							name={`${name}.certainty`}
							placeholder='Certainty'
							options={certaintyOptions}
							component={DropdownComponent}/>
					</Grid.Column>
				</Grid>
			</Segment>
		)

		const OccupationComponent = ({name}) => (
			<Segment>
				<Grid>
					<Grid.Column width={10}>
						<Field
							label="Occupation"
							name={`${name}.value`}
							placeholder="Occupation"
							component={InputField}
						/>
					</Grid.Column>
					<Grid.Column width={6}>
						<Field
							label='Certainty'
							name={`${name}.certainty`}
							placeholder='Certainty'
							options={certaintyOptions}
							component={DropdownComponent}/>
					</Grid.Column>
				</Grid>
			</Segment>
		)

		const NamePanels = [
			{
				title: 'Standard Name',
				key: 'standardNamePanel',
				content: (
					<Segment>
						<Field required
							placeholder="e.g. Last Name, First Name (for indexing purposes)"
							name="standard.name"
							label="Standard Name"
							component={InputField}
						/>
						<Segment basic>
							<Header as="h4">Components</Header>
							<LanguageSelector label="Language" name="standard.lang"/>
							<FieldArray name="standard.parts" component={NameParts} nameOptions={nameOptions}/>
						</Segment>
					</Segment>
				)
			},
			{
				title: 'Variant Name(s)',
				key: 'variantPanel',
				content: (
					<SegmentRepeater
						fieldArrayName="variants"
						headerLabel="Variant Name(s)"
						componentLabel="Variant Name"
						RepeatableComponent={VariantNames}
						nameOptions={nameOptions}
						variantOptions={variantOptions}
					/>
				)
			},
			{
				title: 'Same As',
				key: 'sameAsPanel',
				content: (<Segment><Header as='h4'>Same As</Header></Segment>)
			}
		]

		const DescriptionPanels = [
			{
				title: 'Important Date(s)',
				key: 'datePanel',
				content: (
					<DateRepeater
						fieldArrayName="dates"
						headerLabel="Important Date(s)"
						componentLabel="Date"
					/>
				)
			},
			{
				title: 'Properties',
				key: 'propPanel',
				content: (
					<Segment.Group>
						<Segment><Header as='h4'>Properties</Header></Segment>
						<Segment>
							<Grid>
								<Grid.Column width={4}>
									<Field
										label="Factuality"
										name="properties.factuality"
										placeholder="Factuality"
										options={factualityOptions}
										component={DropdownComponent}
									/>
								</Grid.Column>
								<Grid.Column width={4}>
									<Field
										label='Certainty'
										name='properties.factuality_certainty'
										placeholder='Certainty'
										options={certaintyOptions}
										component={DropdownComponent}/>
								</Grid.Column>
							</Grid>
						</Segment>
						<Segment>
							<Field
								label="Gender"
								name="properties.gender"
								placeholder="Gender"
								multiple
								scrolling
								options={genderOptions}
								component={DropdownComponent}
							/>
						</Segment>
						<SegmentRepeater
							fieldArrayName="properties.nationality"
							headerLabel="Nationality"
							componentLabel="Nationality"
							RepeatableComponent={NationalityComponent}
						/>
						<SegmentRepeater
							fieldArrayName="properties.occupation"
							headerLabel="Occupation"
							componentLabel="Occupation"
							RepeatableComponent={OccupationComponent}
						/>
					</Segment.Group>
				)
			},
			{
				title: 'General Description(s)',
				key: 'genNotePanel',
				content: (
					<SegmentRepeater
						fieldArrayName="descriptiveNote"
						headerLabel="General Description(s)"
						componentLabel="Description"
						RepeatableComponent={DescriptiveNote}
					/>
				)
			},
			{
				title: 'Project-Specific Note(s)',
				key: 'projNotePanel',
				content: (
					<SegmentRepeater
						fieldArrayName="projectNote"
						headerLabel="Project-Specific Note(s)"
						componentLabel="Note"
						RepeatableComponent={ProjectNote}
					/>
				)
			}
		]

		const {handleSubmit, invalid, submitting} = this.props

		return (
			<Segment basic>
				<Rail attached position='left'>
					<Values form='PERSON_FORM'/>
				</Rail>
				<Form onSubmit={handleSubmit} error={invalid}>
					<Header as="h2">
						<FormattedMessage id="Person.identity"/>
					</Header>

					<Segment.Group>
						{NamePanels.map((panel, index) => (
							<Segment basic key={panel.key}>{panel.content}</Segment>
						))}
					</Segment.Group>

					<Header as="h2">
						<FormattedMessage id="Person.description"/>
					</Header>

					<Segment.Group>
						{DescriptionPanels.map((panel, index) => (
							<Segment basic key={panel.key}>{panel.content}</Segment>
						))}
					</Segment.Group>

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
			</Segment>
		)
	}
}

const onSubmit = (values, dispatch) => {
	console.log(values)
	// dispatch()
}

const validate = values => {
	const errors = {}
	if (values.standard && !values.standard.name) {
		errors.standard = {}
		errors.standard.name = 'Required'
	}
	return errors
}

// i.e. model -> view
const mapStateToProps = state => ({
	// initialValues: {}
})

// i.e. controller -> model
const mapDispatchToProps = dispatch => ({})

const reduxFormConfig = reduxForm({
	form: 'PERSON_FORM',
	validate,
	onSubmit
})

export default reduxFormConfig(
	connect(mapStateToProps, mapDispatchToProps)(PersonComponent)
)
