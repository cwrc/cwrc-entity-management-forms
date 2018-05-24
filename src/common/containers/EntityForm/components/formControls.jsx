// @flow
import React from 'react'
import {
	Form,
	Label,
	Dropdown,
	Input as InputComponent
} from 'semantic-ui-react'

const InputField = ({
	input,
	label,
	labelText = null,
	required,
	width,
	floated,
	meta: {touched, error},
	...rest
}: any) => (
	<Form.Field error={!!(touched && error)} required={required} width={width} floated={floated}>
		<label htmlFor={rest.id || rest.name || ''}>{label}</label>
		<InputComponent
			label={labelText}
			{...input}
			{...rest}
		/>
		{touched && error ? (
			<Label basic color="red" pointing>
				{error}
			</Label>
		) : null}
	</Form.Field>
)

const DropdownComponent = ({
	input,
	label,
	meta: {touched, error},
	required,
	width,
	floated,
	...rest
}: any) => (
	<Form.Field required={required} inline floated={floated} width={width}>
		<label htmlFor={rest.id || rest.name || ''}>{label}</label>
		<Dropdown
			{...input}
			{...rest}
			floated={floated}
			value={input.value}
			onChange={(param, data) => { input.onChange(data.value) }}
		/>
	</Form.Field>
)

export {InputField, DropdownComponent}
