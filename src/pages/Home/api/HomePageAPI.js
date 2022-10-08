// Base URL
const base_url = 'https://72.arrowhitech.net/tn1/harry-moon/wordpress/graphql'

// Request init
const resquest_init = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
}

export const homePageAPi = async () => {
	const response = await fetch(base_url, {
		...resquest_init,
		body: JSON.stringify({
			query: `
			{
				page(id: "home", idType: URI) {
					acf {
						components {
							... on Page_Acf_Components_Banner {
								fieldGroupName
								background {
									sourceUrl
								}
								content
								image {
									sourceUrl
								}
								figure {
									... on Page_Acf_Components_Banner_figure {
										number
										description
									}
								}
							}
							
							... on Page_Acf_Components_Section2 {
								fieldGroupName
								content2
								gallery {
									sourceUrl
								}
							}
						}
					}
				}
			}
			`,
		}),
	}).then(res => res.json())
		.then(res => res.data.page.acf.components)
		
	return response
}

