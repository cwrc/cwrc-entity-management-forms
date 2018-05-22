// @flow
import React from 'react'
import {
	Form,
	Button,
	List,
	Icon,
	Grid
} from 'semantic-ui-react'
import {Field, FieldArray, FormSection} from 'redux-form'
import {connect} from 'react-redux'
import {InputField, DropdownComponent} from './formControls'

class NameParts extends FormSection<Props, State> {
	static defaultProps = {}
	render () {
		const nameOptions = this.props.nameOptions
		const renderNameComponents = ({fields, meta: {touched, error, submitFailed}}: any) => {
			if (fields.length === 0) fields.push({})
			return (
				<div>
					<Grid columns={2}>
						<Grid.Row>
							<Grid.Column>
								<Field
									name='namePartLang'
									options={langOptions}
									placeholder='Select Language'
									component={DropdownComponent}/>
							</Grid.Column>
							<Grid.Column>
								<Button floated="right" circular size='mini' color='olive' onClick={() => fields.push({})}>
									<Icon name='plus circle'/>
									Add Another Part
								</Button>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<List verticalAlign='middle'>
						{fields.map((nameComponent, index) => (
							<List.Item key={index} >
								<List.Content>
									<Form.Group inline >
										<Field name={`${nameComponent}.value`} width={10} component={InputField}/>
										<Field name={`${nameComponent}.type`} options={nameOptions} placeholder='Part Type' component={DropdownComponent}/>
										{index > 0 &&
										<Button floated="right" circular size='mini' color='red' onClick={() => fields.remove(index)}>
											<Icon name='minus circle'/>
											Remove Part
										</Button>
										}
									</Form.Group>
								</List.Content>
							</List.Item>
						))}
					</List>
				</div>
			)
		}
		const langOptions = [
			{key: 'en', text: 'English', value: 'en'},
			{key: 'fr', text: 'French', value: 'fr'}
		]

		return (<FieldArray name={name} component={renderNameComponents}/>)
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(NameParts)
