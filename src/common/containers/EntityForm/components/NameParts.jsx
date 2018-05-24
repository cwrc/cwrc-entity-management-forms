// @flow
import React from 'react'
import {
	Form,
	Button,
	List,
	Icon
} from 'semantic-ui-react'
import {Field, FieldArray, FormSection} from 'redux-form'
import {connect} from 'react-redux'
import {InputField, DropdownComponent} from './FormControls'

class NameParts extends FormSection<Props, State> {
	static defaultProps = {}
	render () {
		const name = this.props.name
		const nameOptions = this.props.nameOptions

		const renderNameComponents = ({fields, meta: {touched, error, submitFailed}}: any) => {
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

		return (
			<FieldArray name={name} component={renderNameComponents}/>
		)
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(NameParts)
