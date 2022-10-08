// Base URL
const base_url = 'https://72.arrowhitech.net/tn1/harry-moon/wordpress/graphql'

// Request init
const resquest_init = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
}

// Primary Menu API
export const primaryMenuAPI = async () => {
	const response = await fetch(base_url, {
		...resquest_init,
		body: JSON.stringify({
			query: `
			{
				menu(id: "Main Menu", idType: NAME) {
					menuItems (first:50) {
						nodes {
							parentId
							url
							uri
							id
							label
							childItems {
								edges {
									node {
										id
										label
										uri
									}
								}
							}
						}
					}
				}
			}
			`,
		}),
	}).then(res => res.json())
		.then(res => res.data.menu.menuItems.nodes)
		
	return response
}

// Logo API
export const logoAPI = async () => {
	const response = await fetch(base_url, {
		...resquest_init,
		body: JSON.stringify({
			query: `
			{
				siteLogo {
					sourceUrl
				}
			}
			`,
		}),
	}).then(res => res.json())
		.then(res => res.data.siteLogo.sourceUrl)
		
	return response
}

// Footer Menu 1 API
export const firstFooterMenu = async () => {
	const response = await fetch(base_url, {
		...resquest_init,
		body: JSON.stringify({
			query: `
			{
				menu(id: "Footer Menu 1", idType: NAME) {
					menuItems (first:50) {
						nodes {
							parentId
							url
							uri
							id
							label
							childItems {
								edges {
									node {
										id
										label
										uri
									}
								}
							}
						}
					}
				}
			}
			`,
		}),
	}).then(res => res.json())
		.then(res => res.data.menu.menuItems.nodes)
		
	return response
}

// Footer Menu 2 API
export const secondFooterMenu = async () => {
	const response = await fetch(base_url, {
		...resquest_init,
		body: JSON.stringify({
			query: `
			{
				menu(id: "Footer Menu 2", idType: NAME) {
					menuItems (first:50) {
						nodes {
							parentId
							url
							uri
							id
							label
							childItems {
								edges {
									node {
										id
										label
										uri
									}
								}
							}
						}
					}
				}
			}
			`,
		}),
	}).then(res => res.json())
		.then(res => res.data.menu.menuItems.nodes)
		
	return response
}

// footer infor API
export const footerDataAPI = async () => {
	const response = await fetch(base_url, {
		...resquest_init,
		body: JSON.stringify({
			query: `
			{
				topLogo
				bottomLogo
				copyright
				newsletterTitle
				newsletterDesc
				mailchimpUrl
			}
			`,
		}),
	}).then(res => res.json())
		.then(res => res.data)
		
	return response
}

