import Home from '~/pages/Home'
import MagentoDevelopment from '../pages/MagentoDevelopment'
// Public routes
const publicRoutes = [
	{id:1, path: '/', component: Home},
	{id:2, path: '/magento-development', component: MagentoDevelopment, layout:undefined}
]

// Private routes
const privateRoutes = []

export {publicRoutes, privateRoutes}