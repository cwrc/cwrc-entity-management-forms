// @flow
import React from 'react'
import {
	Form,
	Button,
	List,
	Popup
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
							<Field name={`${nameComponent}.value`} width={11} component={InputField}/>
							<Field name={`${nameComponent}.type`} width={4} options={nameOptions} label='Name Type' placeholder='Name Type' component={DropdownComponent}/>
							{index === 0 &&
							<Popup size='tiny' position='right center' trigger={
								<Button type="button" size='mini' color='olive' icon='plus' onClick={() => fields.push({})}/>
							} content='Add a Name Part'/>
							}
							{index > 0 &&
							<Popup size='tiny' position='right center' trigger={
								<Button type="button" size='mini' color='red' icon='minus' onClick={() => fields.remove(index)}/>
							} content='Remove Name Part'/>
							}
						</Form.Group>
					</List.Content>
				</List.Item>
			))}
		</List>
	)
}

export default NameParts
