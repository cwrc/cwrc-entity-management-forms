// @flow
import React from 'react'
import {
	Grid,
	Segment,
	Button,
	List,
	Icon
} from 'semantic-ui-react'
import {Field} from 'redux-form'

const WorldCatLookup = ({
	input,
	...rest
}: any) => (
	<Field
		{...input}
		{...rest}/>
)

export default WorldCatLookup
