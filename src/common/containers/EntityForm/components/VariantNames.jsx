// @flow
import React from 'react'
import {Field, FieldArray} from 'redux-form'
import {Segment, Grid, Button, Divider, Icon} from 'semantic-ui-react'
import {DropdownComponent} from '../components/FormControls'
import NameParts from '../components/NameParts'
import LanguageSelector from '../components/LanguageSelector'
import ProjectSelector from '../components/ProjectSelector'

const VariantNames = ({
	fields,
	variantOptions,
	nameOptions,
	meta: {touched, error, submitFailed}
}: any) => {
	if (fields.length === 0) fields.push({})
	return (
		<Segment>
			{fields.map((nameComponent, index) => (
				<Segment key={index} secondary >
					<Grid columns={4}>
						<Grid.Column>
							<Field
								name={`${nameComponent}.variantType`}
								required
								label='Variant Type'
								options={variantOptions}
								placeholder='Select Type'
								component={DropdownComponent}/>
						</Grid.Column>
						<Grid.Column>
							<ProjectSelector
								name={`${nameComponent}.project`}
								label='Project'/>
						</Grid.Column>
						<Grid.Column>
							<LanguageSelector
								name={`${nameComponent}.lang`}
								label="Language"/>
						</Grid.Column>
						<Grid.Column>
							{index === 0 &&
							<Button type="button" floated='right' circular color="olive" size='mini' onClick={() => { fields.push() }}>
								<Icon name='plus circle'/>
								Add Another Variant Name
							</Button>
							}
							{index > 0 &&
							<Button type="button" floated="right" circular size='mini' color='red' onClick={() => fields.remove(index)}>
								<Icon name='minus circle'/>
								Remove Variant
							</Button>
							}
						</Grid.Column>
					</Grid>
					<Divider/>
					<FieldArray name={`${nameComponent}.parts`} nameOptions={nameOptions} component={NameParts}/>
				</Segment>
			))}
		</Segment>
	)
}

export default VariantNames
