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
import LanguageSelector from '../../components/LanguageSelector'
import ProjectSelector from '../../components/ProjectSelector'
import EntityLookup from '../../components/EntityLookup'

import {required} from '../../components/FieldValidation'

import Values from '../../components/Values'

import type {FormProps} from 'redux-form'

// import sampleValues from '../../../../../../static/sample_person'

const nameOptions = [
	{key: '', text: '', value: ''},
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
			<div>
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
			</div>
		)

		const ProjectNote = ({name}) => (
			<div>
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
			</div>
		)

		const NationalityComponent = ({name}) => (
			<div>
				<Grid verticalAlign='middle' columns='equal'>
					<Grid.Column>
						<Field
							inline
							label="Nationality"
							name={`${name}.value`}
							placeholder="Nationality"
							component={InputField}
						/>
					</Grid.Column>
					<Grid.Column>
						<Field
							label='Certainty'
							name={`${name}.cert`}
							placeholder='Certainty'
							options={certaintyOptions}
							component={DropdownComponent}/>
					</Grid.Column>
				</Grid>
			</div>
		)

		const OccupationComponent = ({name}) => (
			<div>
				<Grid verticalAlign='middle' columns='equal'>
					<Grid.Column>
						<Field
							inline
							label="Occupation"
							name={`${name}.value`}
							placeholder="Occupation"
							component={InputField}
						/>
					</Grid.Column>
					<Grid.Column>
						<Field
							label='Certainty'
							name={`${name}.cert`}
							placeholder='Certainty'
							options={certaintyOptions}
							component={DropdownComponent}/>
					</Grid.Column>
				</Grid>
			</div>
		)

		const NamePanels = [
			{
				title: 'Standard Name',
				key: 'standardNamePanel',
				content: (
					<Segment>
						<Field
							required
							validate={[required]}
							placeholder="e.g. Last Name, First Name (for indexing purposes)"
							name="identity.standardName"
							label="Standard Name"
							component={InputField}
						/>
						<Segment basic>
							<Header as="h4">Components</Header>
							<LanguageSelector label="Language" name="identity.namePartsLang"/>
							<FieldArray name="identity.nameParts" component={NameParts} nameOptions={nameOptions}/>
						</Segment>
					</Segment>
				)
			},
			{
				title: 'Variant Name(s)',
				key: 'variantPanel',
				content: (
					<SegmentRepeater
						fieldArrayName="identity.variants"
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
				content: (
					<SegmentRepeater
						fieldArrayName="identity.sameAs"
						headerLabel="Same As"
						componentLabel="Same As"
						RepeatableComponent={EntityLookup}
						buttonLabel='Add Person'
						includeCertainty={true}
						certaintyOptions={certaintyOptions}
						entityType='person'
						changeFunc={this.props.change}
					/>
				)
			}
		]

		const DescriptionPanels = [
			{
				title: 'Important Date(s)',
				key: 'datePanel',
				content: (
					<DateRepeater
						fieldArrayName="description.dates"
						headerLabel="Important Date(s)"
						componentLabel="Date"
						changeFunc={this.props.change}
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
							<Grid columns='equal'>
								<Grid.Column>
									<Field
										label="Factuality"
										name="description.properties.factuality.value"
										placeholder="Factuality"
										options={factualityOptions}
										component={DropdownComponent}
									/>
								</Grid.Column>
								<Grid.Column>
									<Field
										label='Certainty'
										name='description.properties.factuality.cert'
										placeholder='Certainty'
										options={certaintyOptions}
										component={DropdownComponent}/>
								</Grid.Column>
							</Grid>
						</Segment>
						<Segment>
							<Field
								label="Gender"
								name="description.properties.gender"
								placeholder="Gender"
								multiple
								scrolling
								options={genderOptions}
								component={DropdownComponent}
							/>
						</Segment>
						<SegmentRepeater
							fieldArrayName="description.properties.nationality"
							headerLabel="Nationality"
							componentLabel="Nationality"
							RepeatableComponent={NationalityComponent}
						/>
						<SegmentRepeater
							fieldArrayName="description.properties.occupation"
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
						fieldArrayName="description.descriptiveNote"
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
						fieldArrayName="description.projectNote"
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
					{/* <Segment> */}
					<SegmentRepeater
						fieldArrayName="sources.bibl"
						headerLabel=""
						componentLabel="Source"
						RepeatableComponent={EntityLookup}
						buttonLabel='Add Source'
						entityType='title'
						changeFunc={this.props.change}
					/>
					{/* </Segment> */}

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

const createXMLFromPath = (parent: Element, path: String, childText?: String) => {
	let tags = path.split('/')
	let currParent = parent
	for (let tag of tags) {
		let hasAtt = tag.indexOf('[') !== -1
		let tagName
		if (hasAtt) {
			tagName = tag.slice(0, tag.indexOf('['))
		} else {
			tagName = tag
		}
		let el = parent.ownerDocument.createElement(tagName)
		if (hasAtt) {
			let attName = tag.slice(tag.indexOf('@') + 1, tag.indexOf('='))
			let attValue = tag.slice(tag.indexOf('"') + 1, tag.lastIndexOf('"'))
			attValue = decodeURIComponent(attValue)
			el.setAttribute(attName, attValue)
		}
		currParent.appendChild(el)

		currParent = el
	}
	if (childText !== undefined) {
		currParent.appendChild(currParent.ownerDocument.createTextNode(childText))
	}

	return currParent
}

const json2xml = (values) => {
	let xml = `<?xml version="1.0" encoding="UTF-8"?>
	<TEI xmlns="http://www.tei-c.org/ns/1.0"><text><body><listPerson><person></person></listPerson></body></text></TEI>`
	let xmlDoc
	if (window.DOMParser) {
		const parser = new DOMParser()
		xmlDoc = parser.parseFromString(xml, 'text/xml')
	} else {
		return null
	}

	let person = xmlDoc.querySelector('person')
	// identity
	// lang
	if (values.identity.namePartsLang) {
		let persNameLangEl = createXMLFromPath(person, 'persName')
		persNameLangEl.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', values.identity.namePartsLang)
	}
	// standard name
	createXMLFromPath(person, 'persName[@type="standard"]/name', values.identity.standardName)
	// name components
	if (values.identity.nameParts) {
		for (let namePart of values.identity.nameParts) {
			let namePartEl = createXMLFromPath(person, 'persName[@type="prefered"]/name', namePart.value)
			if (namePart.type) {
				let namePartType = namePart.type.replace(/\s+/g, '_')
				namePartEl.setAttribute('type', namePartType)
			}
		}
	}
	// name variants
	if (values.identity.variants) {
		for (let variant of values.identity.variants) {
			let variantEl = createXMLFromPath(person, 'persName[@type="variant"]')
			if (variant.lang) {
				variantEl.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', variant.lang)
			}
			if (variant.type) {
				let variantType = variant.type.replace(/\s+/g, '_')
				variantEl.setAttribute('role', variantType)
			}
			if (variant.project) {
				createXMLFromPath(variantEl, 'note/desc/orgName', variant.project)
			}
			if (variant.parts) {
				for (let part of variant.parts) {
					createXMLFromPath(variantEl, `name[@type="${part.type}"]`, part.value)
				}
			}
		}
	}
	// same as
	if (values.identity.sameAs) {
		for (let sameAs of values.identity.sameAs) {
			let sameAsEl = createXMLFromPath(person, `idno[@type="${sameAs.type}"]`, sameAs.idno)
			if (sameAs.cert) {
				sameAsEl.setAttribute('cert', sameAs.cert)
			}
		}
	}
	// description
	// dates
	if (values.description.dates) {
		for (let date of values.description.dates) {
			let dateTypeEl = createXMLFromPath(person, date.type)
			let dateEl = createXMLFromPath(dateTypeEl, 'date')
			if (date.cert) {
				dateEl.setAttribute('cert', date.cert)
			}
			if (date.date1 && date.qualifier1) {
				dateEl.setAttribute(date.qualifier1, date.date1)
			}
			if (date.date2 && date.qualifier2) {
				dateEl.setAttribute(date.qualifier2, date.date2)
			}
			if (date.note) {
				createXMLFromPath(dateEl, 'note', date.note)
			}
			if (date.place) {
				createXMLFromPath(dateTypeEl, `placeName[@ref="${encodeURIComponent(date.place.idno)}"]`, date.place.name)
			}
		}
	}
	// properties
	let props = values.description.properties
	if (props) {
		// factuality
		if (props.factuality) {
			let traitEl = createXMLFromPath(person, 'trait[@type="factuality"]')
			if (props.factuality.cert) {
				traitEl.setAttribute('cert', props.factuality.cert)
			}
			createXMLFromPath(traitEl, 'ab', props.factuality.value)
		}
		// gender
		if (props.gender) {
			let sex = props.gender.join(' ')
			person.setAttribute('sex', sex)
		}
		// occupation
		if (props.occupation) {
			for (let occ of props.occupation) {
				let occEl = createXMLFromPath(person, 'occupation', occ.value)
				if (occ.cert) {
					occEl.setAttribute('cert', occ.cert)
				}
			}
		}
		// nationality
		if (props.nationality) {
			for (let nat of props.nationality) {
				let natEl = createXMLFromPath(person, 'nationality', nat.value)
				if (nat.cert) {
					natEl.setAttribute('cert', nat.cert)
				}
			}
		}
	}
	// description
	if (values.description.descriptiveNote) {
		for (let note of values.description.descriptiveNote) {
			let noteEl = createXMLFromPath(person, 'note[@type="general"]', note.value)
			if (note.lang) {
				noteEl.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', note.lang)
			}
		}
	}
	// project note
	if (values.description.projectNote) {
		for (let note of values.description.projectNote) {
			let noteEl = createXMLFromPath(person, 'note[@type="project-specific"]', note.value)
			if (note.lang) {
				noteEl.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', note.lang)
			}
			if (note.project) {
				createXMLFromPath(noteEl, 'respons[@locus="value"]/desc/orgName', note.project)
			}
		}
	}
	// sources
	if (values.sources.bibl) {
		let listBibl = createXMLFromPath(person, 'listBibl')
		for (let bibl of values.sources.bibl) {
			let biblEl = createXMLFromPath(listBibl, 'bibl')
			createXMLFromPath(biblEl, 'title', bibl.name)
			createXMLFromPath(biblEl, `idno[@type="${bibl.type}"]`, bibl.idno)
		}
	}
	return xmlDoc
}

const onSubmit = (values, dispatch) => {
	// let xml = json2xml(sampleValues)
	// let s = new XMLSerializer()
	// let xmlStr = s.serializeToString(xml)
	// console.log(xml)
	// dispatch()
}

const validate = values => {
	const errors = {}
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
