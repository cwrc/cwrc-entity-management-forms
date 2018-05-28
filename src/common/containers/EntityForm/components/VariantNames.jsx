// @flow
import React from 'react'
import {Field, FieldArray} from 'redux-form'
import {Segment, Grid, Divider} from 'semantic-ui-react'
import {DropdownComponent} from '../components/FormControls'
import NameParts from '../components/NameParts'
import LanguageSelector from '../components/LanguageSelector'
import ProjectSelector from '../components/ProjectSelector'

const VariantNames = ({
	name,
	variantOptions,
	nameOptions
}: any) => (
	<Segment>
		<Grid columns={4}>
			<Grid.Column>
				<Field
					name={`${name}.variantType`}
					required
					label='Variant Type'
					options={variantOptions}
					placeholder='Select Type'
					component={DropdownComponent}/>
			</Grid.Column>
			<Grid.Column>
				<ProjectSelector
					name={`${name}.project`}
					label='Project'/>
			</Grid.Column>
			<Grid.Column>
				<LanguageSelector
					name={`${name}.lang`}
					label="Language"/>
			</Grid.Column>
		</Grid>
		<Divider/>
		<FieldArray name={`${name}.parts`} nameOptions={nameOptions} component={NameParts}/>
	</Segment>
)

export default VariantNames
