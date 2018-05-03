// @flow
import React, {Component} from 'react'
import {
	Form,
	Header,
	Message,
	Button,
	Grid,
	Divider,
	Segment,
	Accordion,
	Icon
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {reduxForm, Field, FieldArray} from 'redux-form'
import {FormattedMessage} from 'react-intl'
import {DropdownComponent, InputField} from './shared'
import FieldRepeater from './shared/fieldRepeater'
import Names from './Names.jsx'
import type {FormProps} from 'redux-form'

type Props = FormProps

class PersonComponent extends Component<Props, State> {
	render () {
		const renderVariantPanel = ({fields, meta: {touched, error, submitFailed}}: any) => {
			if (fields.length === 0) fields.push({})
			return (
				<Segment>
					<Grid>
						<Grid.Row columns="1">
							<Grid.Column>
								<Button floated='right' circular color="olive" type="button" size='mini' onClick={() => { fields.push() }}><Icon name='plus circle'/>Add Another Variant Name</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					{fields.map((nameComponent, index) => (
						<Segment key={index} secondary >
							<Grid columns={3}>
								<Grid.Row>
									<Grid.Column>
										<Field
											name='variantType'
											required
											label='Type of Variant'
											options={variantOptions}
											placeholder='Select Type'
											component={DropdownComponent}/>
									</Grid.Column>
									<Grid.Column>
										<Field
											name='projectForVariant'
											label='Project'
											options={projectOptions}
											placeholder='Select Project'
											component={DropdownComponent}/>
									</Grid.Column>
									<Grid.Column>
										{index > 0 &&
										<Button floated="right" circular size='mini' color='red' onClick={() => fields.remove(index)}>
											<Icon name='minus circle'/>
											Remove Variant
										</Button>
										}
									</Grid.Column>
								</Grid.Row>
							</Grid>
							<Divider/>
							<Names name="variantParts"/>
						</Segment>
					))}
				</Segment>
			)
		}

		const variantOptions = [
			{key: 'maiden', text: 'Maiden Name', value: 'maiden'},
			{key: 'changed', text: 'Legally Changed', value: 'changed'},
			{key: 'stage', text: 'Stage Name', value: 'stage'}
		]
		const projectOptions = [
			{key: 'ww', text: 'Women Writers', value: 'ww'},
			{key: 'isicily', text: 'I.Sicily', value: 'isicily'},
			{key: 'smith', text: 'Smith', value: 'smith'}
		]
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
		const variantPanelContent = (
			<div>
				<FieldArray name="variants" component={renderVariantPanel}></FieldArray>
			</div>
		)

		const standardNamePanelContent = (
			<Segment>
				<Field key="standard-name" required
					placeholder="E.g., Last Name, First Name (for display)"
					name="standard-name"
					label="Standard Form"
					component={InputField}
				/>
				<Divider horizontal>may be split into parts</Divider>
				<Names name="standard"/>
			</Segment>
		)

		const NamePanels = [
			{
				title: 'Standard Name',
				content: {
					content: standardNamePanelContent,
					key: 'standardNamePanel'
				}
			},
			{
				title: 'Variant Name(s)',
				content: {
					content: variantPanelContent,
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
					content: (<Segment>Dates will go here.</Segment>),
					key: 'datePanel'
				}
			},
			{
				title: 'Properties',
				content: {
					content: (<Segment>Properties????  ah the various dropdowns</Segment>),
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

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default reduxForm({form: 'PERSON_FORM'})(
	connect(mapStateToProps, mapDispatchToProps)(PersonComponent)
)
