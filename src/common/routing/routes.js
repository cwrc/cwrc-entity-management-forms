// @flow
import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {asyncComponent} from 'react-async-component'
import {Loader, Dimmer, Header, Icon} from 'semantic-ui-react'
import _ from 'lodash'

import type {RouteItem} from 'types'

function asyncComponentCreator (url) {
	return asyncComponent({
		// flow-disable-next-line: The parameter passed to import() must be a literal string
		resolve: () => import(/* webpackChunkName:"[index].[request]" */ `containers/${url}/index.jsx`),
		LoadingComponent () {
			return (
				<Dimmer active>
					<Loader size="large" active>
						Loading page...
					</Loader>
				</Dimmer>
			)
		},
		ErrorComponent () {
			return (
				<Dimmer active>
					<Header inverted as="h2" icon textAlign="center">
						<Icon name="refresh" />
						Refresh
						<Header.Subheader>Got error while loading page.</Header.Subheader>
					</Header>
				</Dimmer>
			)
		},
		autoResolveES2015Default: true,
		env: process.env.BROWSER ? 'browser' : 'node',
		serverMode: 'resolve'
	})
}

function routingFnCreator (useFor: 'sidebar' | 'routing' | 'meta' | 'all' = 'all') {
	const [AsyncDashoard, AsyncLogin, AsyncOrgEdit, AsyncPersonEdit, AsyncPlaceEdit, AsyncNotFound] = [
		'Dashboard',
		'Login',
		'EntityForm/Organization',
		'EntityForm/Person',
		'EntityForm/Place',
		'NotFound'
	].map(a => asyncComponentCreator(a))

	const sidebarExternalLinks = [
		{
			external: true,
			path: 'http://cwrc.ca',
			meta: {
				sidebarVisible: true,
				icon: 'home',
				name: 'CWRC'
			}
		}
	]

	const routes: Array<RouteItem> = [
		{
			path: '/',
			exact: true,
			tag: Route,
			component: AsyncDashoard,
			meta: {
				icon: 'tasks',
				name: 'Dashboard',
				sidebarVisible: true
			}
		},
		{
			path: '/person',
			exact: true,
			tag: Route,
			component: AsyncPersonEdit,
			meta: {
				name: 'Add a Person',
				icon: 'user',
				sidebarVisible: true
			}
		},
		{
			path: '/place',
			exact: true,
			tag: Route,
			component: AsyncPlaceEdit,
			meta: {
				name: 'Add a Place',
				icon: 'world',
				sidebarVisible: true
			}
		},
		{
			path: '/organization',
			exact: true,
			tag: Route,
			component: AsyncOrgEdit,
			meta: {
				name: 'Add an Organization',
				icon: 'users',
				sidebarVisible: true
			}
		},
		{
			path: '/auth',
			exact: true,
			tag: Route,
			component: AsyncLogin,
			meta: {
				name: 'Auth'
			}
		},
		// Find the way to add/remove routes conditionally
		{
			tag: Route,
			component: AsyncNotFound,
			meta: {
				name: '404'
			}
		},
		{
			tag: Redirect,
			to: '/auth'
		}
	]

	const fns = {
		// Returns routing for sidebar menu
		sidebar (x: Array<RouteItem> = routes.concat(sidebarExternalLinks)) {
			return x
				.filter(a => a.meta && a.meta.sidebarVisible)
				.map(a => _.pick(a, ['path', 'meta', 'external', 'strict', 'exact']))
		},
		// Returns routing for React-Router
		routing (x: Array<RouteItem> = routes) {
			return x
				.filter(a => a.tag)
				.map(a =>
					_.pick(a, [
						'path',
						'strict',
						'exact',
						'component',
						'tag',
						'to'
					])
				)
		},
		// Returns `meta` + path. used in Header
		meta (x: Array<RouteItem> = routes) {
			return x
				.filter(a => a.tag)
				.map(a =>
					_.pick(a, [
						'path',
						'strict',
						'exact',
						'meta'
					])
				)
		},
		all () {
			return routes
		}
	}

	return fns[useFor]
}

export const getRoutes = routingFnCreator()
export const getMetaRoutes = routingFnCreator('meta')
export const getSidebarRoutes = routingFnCreator('sidebar')
export const getRouterRoutes = routingFnCreator('routing')
