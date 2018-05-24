// @flow
import React, {Component} from 'react'
import {
	Form,
	Header,
	Message,
	Grid,
	Button,
	Icon,
	Segment,
	Accordion,
	Rail
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {reduxForm, Field, FieldArray} from 'redux-form'
import {FormattedMessage} from 'react-intl'

import {InputField, DropdownComponent} from '../../components/FormControls'
import FieldRepeater from '../../components/FieldRepeater'
import NameParts from '../../components/NameParts'
import VariantNames from '../../components/VariantNames'
import DateComponent from '../../components/DateComponent'
import LanguageSelector from '../../components/LanguageSelector'
import ProjectSelector from '../../components/ProjectSelector'
import Values from '../../components/Values'

import type {FormProps} from 'redux-form'

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

const factualityOptions = [
	{key: 'real', text: 'Real', value: 'real'},
	{key: 'fake', text: 'Fake', value: 'fake'}
]

const certaintyOptions = [
	{key: 'high', text: 'High', value: 'high'},
	{key: 'medium', text: 'Medium', value: 'medium'},
	{key: 'low', text: 'Low', value: 'low'},
	{key: 'unknown', text: 'Unknown', value: 'unknown'}
]

const genderOptions = [
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
		const renderDescriptiveNote = ({fields, meta: {touched, error, submitFailed}}) => {
			if (fields.length === 0) fields.push({})
			return fields.map((field, index) => (
				<Segment key={index} secondary>
					<Grid>
						<Grid.Row>
							<Grid.Column width={12}>
								<LanguageSelector label="Language" name={`${field}.lang`}/>
							</Grid.Column>
							<Grid.Column width={4}>
								{index === 0 &&
								<Button type="button" floated="right" circular size='mini' color='olive' onClick={() => fields.push({})}>
									<Icon name='plus circle'/>
									Add Another Description
								</Button>
								}
								{index > 0 &&
								<Button type="button" floated="right" circular size='mini' color='red' onClick={() => fields.remove(index)}>
									<Icon name='minus circle'/>
									Remove Description
								</Button>
								}
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={12}>
								<Field
									width={10}
									name={`${field}.value`}
									component='textarea'
									rows={3}
									placeholder="Add your note here."/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			))
		}

		const renderProjectNote = ({fields, meta: {touched, error, submitFailed}}) => {
			if (fields.length === 0) fields.push({})
			return fields.map((field, index) => (
				<Segment key={index} secondary>
					<Grid>
						<Grid.Row>
							<Grid.Column width={6}>
								<ProjectSelector label="Project" name={`${field}.project`}/>
							</Grid.Column>
							<Grid.Column width={6}>
								<LanguageSelector label="Language" name={`${field}.lang`}/>
							</Grid.Column>
							<Grid.Column width={4}>
								{index === 0 &&
								<Button type="button" floated="right" circular size='mini' color='olive' onClick={() => fields.push({})}>
									<Icon name='plus circle'/>
									Add Another Project Note
								</Button>
								}
								{index > 0 &&
								<Button type="button" floated="right" circular size='mini' color='red' onClick={() => fields.remove(index)}>
									<Icon name='minus circle'/>
									Remove Project Note
								</Button>
								}
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={12}>
								<Field
									width={10}
									name={`${field}.value`}
									component='textarea'
									rows={3}
									placeholder="Add your note here."/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			))
		}

		const RepeatableSameAsComponent = ({field}) => (
			<Field
				width={12}
				name={`${field}.value`}
				component={InputField}
				placeholder="e.g., http://viaf.org/3323"/>
		)

		const renderNationality = ({fields, meta: {touched, error, submitFailed}}) => {
			if (fields.length === 0) fields.push({})
			return fields.map((field, index) => (
				<Segment key={index} secondary>
					<Grid>
						<Grid.Column width={8}>
							<Field
								label="Nationality"
								name={`${field}.value`}
								placeholder="Nationality"
								component={InputField}
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<Field
								label='Certainty'
								name={`${field}.certainty`}
								placeholder='Certainty'
								options={certaintyOptions}
								component={DropdownComponent}/>
						</Grid.Column>
						<Grid.Column width={4}>
							{index === 0 &&
							<Button type="button" floated="right" circular size='mini' color='olive' onClick={() => fields.push({})}>
								<Icon name='plus circle'/>
								Add Another Nationality
							</Button>
							}
							{index > 0 &&
							<Button type="button" floated="right" circular size='mini' color='red' onClick={() => fields.remove(index)}>
								<Icon name='minus circle'/>
								Remove Nationality
							</Button>
							}
						</Grid.Column>
					</Grid>
				</Segment>
			))
		}

		const renderOccupation = ({fields, meta: {touched, error, submitFailed}}) => {
			if (fields.length === 0) fields.push({})
			return fields.map((field, index) => (
				<Segment key={index} secondary>
					<Grid>
						<Grid.Column width={8}>
							<Field
								label="Occupation"
								name={`${field}.value`}
								placeholder="Occupation"
								component={InputField}
							/>
						</Grid.Column>
						<Grid.Column width={4}>
							<Field
								label='Certainty'
								name={`${field}.certainty`}
								placeholder='Certainty'
								options={certaintyOptions}
								component={DropdownComponent}/>
						</Grid.Column>
						<Grid.Column width={4}>
							{index === 0 &&
							<Button type="button" floated="right" circular size='mini' color='olive' onClick={() => fields.push({})}>
								<Icon name='plus circle'/>
								Add Another Occupation
							</Button>
							}
							{index > 0 &&
							<Button type="button" floated="right" circular size='mini' color='red' onClick={() => fields.remove(index)}>
								<Icon name='minus circle'/>
								Remove Occupation
							</Button>
							}
						</Grid.Column>
					</Grid>
				</Segment>
			))
		}

		const NamePanels = [
			{
				title: 'Standard Name',
				content: {
					content: (
						<Segment>
							<Field key="standard-name" required
								placeholder="e.g. Last Name, First Name (for indexing purposes)"
								name="standard.name"
								label="Standard Name"
								component={InputField}
							/>
							<Segment secondary>
								<Header as="h4">Components</Header>
								<LanguageSelector label="Language" name="standard.lang"/>
								<FieldArray name="standard.parts" component={NameParts} nameOptions={nameOptions}/>
							</Segment>
						</Segment>
					),
					key: 'standardNamePanel'
				}
			},
			{
				title: 'Variant Name(s)',
				content: {
					content: (
						<FieldArray
							name="variants"
							component={VariantNames}
							variantOptions={variantOptions}
							nameOptions={nameOptions}
						/>
					),
					key: 'variantPanel'
				}
			},
			{
				title: 'Same As',
				content: {
					content: (<Segment><FieldRepeater
						fieldArrayName="sameAs"
						componentLabel="Same As"
						RepeatableComponent={RepeatableSameAsComponent}
					/></Segment>),
					key: 'sameAsPanel'
				}
			}
		]

		const DescriptionPanels = [
			{
				title: 'Important Dates',
				content: {
					content: (<Segment><FieldRepeater
						fieldArrayName="dates"
						componentLabel="Date"
						RepeatableComponent={DateComponent}
					/></Segment>),
					key: 'datePanel'
				}
			},
			{
				title: 'Properties',
				content: {
					content: (
						<Segment>
							<Segment secondary>
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
							<Segment secondary>
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
							<FieldArray name="properties.nationality" component={renderNationality}/>
							<FieldArray name="properties.occupation" component={renderOccupation}/>
						</Segment>
					),
					key: 'propPanel'
				}
			},
			{
				title: 'General Notes',
				content: {
					content: (<Segment><FieldArray name="descriptiveNotes" component={renderDescriptiveNote}/></Segment>),
					key: 'genNotePanel'
				}
			},
			{
				title: 'Project Specific Notes',
				content: {
					content: (<Segment><FieldArray name="projectNotes" component={renderProjectNote}/></Segment>),
					key: 'projNotePanel'
				}
			}
		]

		const {handleSubmit, invalid, submitting} = this.props

		return (
			<Segment>
				<Rail attached position='left'>
					<Values form='PERSON_FORM'/>
				</Rail>
				<Form onSubmit={handleSubmit} error={invalid}>
					<Header as="h2">
						<FormattedMessage id="Person.identity"/>
					</Header>

					<Accordion defaultActiveIndex={[0]} panels={NamePanels} exclusive={false}/>

					<Header as="h2">
						<FormattedMessage id="Person.description"/>
					</Header>

					<Accordion defaultActiveIndex={[2]} panels={DescriptionPanels} exclusive={false}/>

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

// i.e. model -> view
const mapStateToProps = state => ({
	// initialValues: {}
})

// i.e. controller -> model
const mapDispatchToProps = dispatch => ({})

const reduxFormConfig = reduxForm({
	form: 'PERSON_FORM'
})

export default reduxFormConfig(
	connect(mapStateToProps, mapDispatchToProps)(PersonComponent)
)
