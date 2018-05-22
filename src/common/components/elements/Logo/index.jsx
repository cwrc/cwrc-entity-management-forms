// @flow
import React from 'react'
import {Image as ImageComponent} from 'semantic-ui-react'

type Props = {
	shape: string, // | 'circular'
	centered: boolean,
	white: boolean
}

const Logo = (props: Props) => {
	let logoImg
	if (props.white === true) {
		logoImg = require('images/Logo_White.png')
	} else {
		logoImg = require('images/Logo.png')
	}
	return <ImageComponent src={logoImg} />
}

export default Logo
