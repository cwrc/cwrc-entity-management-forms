// @flow
import React from 'react'
import {
	Form,
	Button,
	Grid,
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
	return <Segment>
		<Grid>
			<Grid.Row columns="1">
				<Grid.Column>
					<Button floated='right' circular color="olive" type="button" size='mini' onClick={() => {
						fields.push({})
					}}><Icon name='plus circle'/>Add {fields.length === 0 ? 'A' : 'Another '} {componentLabel}</Button>
				</Grid.Column>
			</Grid.Row>
		</Grid>
		{fields.map((field, index) => (
			<Segment key={index} secondary>
				<Form.Group inline>
					<RepeatableComponent field={field}/>
					{index > 0 &&
					<Button width="4" floated="right" circular size='mini' color='red' onClick={() => fields.remove(index)}>
						<Icon name='minus circle'/>
						Remove {componentLabel}
					</Button>
					}
				</Form.Group>
			</Segment>
		))}
	</Segment>
}

export default FieldRepeater
