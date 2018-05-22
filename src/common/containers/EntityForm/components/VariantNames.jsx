// @flow
import React from 'react'
import {Field} from 'redux-form'
import {Segment, Grid, Button, Divider, Icon} from 'semantic-ui-react'
import {DropdownComponent} from '../components/formControls'
import NameParts from '../components/NameParts'

const VariantNames = ({
	fields,
	variantOptions,
	projectOptions,
	nameOptions,
	meta: {touched, error, submitFailed}
}: any) => {
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
					<NameParts name={nameComponent.nameParts} nameOptions={nameOptions}/>
				</Segment>
			))}
		</Segment>
	)
}

export default VariantNames
