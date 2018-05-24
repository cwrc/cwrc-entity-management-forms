// @flow
import React from 'react'
import {
	Form,
	Button,
	Segment,
	Icon
} from 'semantic-ui-react'
import {FieldArray} from 'redux-form'

const FieldRepeater = ({
	fieldArrayName,
	componentLabel,
	RepeatableComponent
}: any) => {
	return (
		<FieldArray
			name={fieldArrayName}
			props={{
				RepeatableComponent,
				componentLabel
			}}
			component={renderFields}
		/>
	)
}

const renderFields = ({
	fields,
	RepeatableComponent,
	componentLabel,
	meta: {touched, error, submitFailed}}: any
) => {
	if (fields.length === 0) fields.push({})
	return (
		(fields.map((field, index) => (
			<Segment key={index} secondary>
				<Form.Group inline>
					<RepeatableComponent field={field}/>
					{index === 0 &&
					<Button floated='right' circular color="olive" type="button" size='mini' onClick={() => fields.push({})}>
						<Icon name='plus circle'/>Add {fields.length === 0 ? 'A' : 'Another '} {componentLabel}
					</Button>
					}
					{index > 0 &&
					<Button type="button" width="4" floated="right" circular size='mini' color='red' onClick={() => fields.remove(index)}>
						<Icon name='minus circle'/>
						Remove {componentLabel}
					</Button>
					}
				</Form.Group>
			</Segment>
		)))
	)
}

export default FieldRepeater
