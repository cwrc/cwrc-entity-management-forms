// @flow
import React from 'react'
import {
	Form,
	Button,
	List,
	Icon
} from 'semantic-ui-react'
import {Field} from 'redux-form'
import {InputField, DropdownComponent} from './FormControls'

const NameParts = ({
	fields,
	name,
	nameOptions,
	meta: {touched, error, submitFailed}
}: any) => {
	if (fields.length === 0) fields.push({})
	return (
		<List verticalAlign='middle'>
			{fields.map((nameComponent, index) => (
				<List.Item key={index} >
					<List.Content>
						<Form.Group inline>
							<Field name={`${nameComponent}.value`} width={9} component={InputField}/>
							<Field name={`${nameComponent}.type`} width={4} options={nameOptions} label='Name Type' placeholder='Name Type' component={DropdownComponent}/>
							{index === 0 &&
							<Button type="button" floated="right" circular size='mini' color='olive' onClick={() => fields.push({})}>
								<Icon name='plus circle'/>
								Add Another Part
							</Button>
							}
							{index > 0 &&
							<Button type="button" floated="right" circular size='mini' color='red' onClick={() => fields.remove(index)}>
								<Icon name='minus circle'/>
								Remove Part
							</Button>
							}
						</Form.Group>
					</List.Content>
				</List.Item>
			))}
		</List>
	)
}

export default NameParts
