import BannerSection from "./BannerSection";
import { homePageAPi } from "./api";
import { useEffect, useState } from "react";

function Home() {

	const [bannerSection, setBannerSection] = useState({})
	const [section2, setSection2] = useState([])

	useEffect(() => {
		homePageAPi()
				.then(res => {
					const bannerSection = res.find((item) => item.fieldGroupName === "Page_Acf_Components_Banner")
					const section2 = res.find((item) => item.fieldGroupName === "Page_Acf_Components_Section2")
					setBannerSection(bannerSection);
					setSection2(section2);
				})
				.catch(err => {
					throw err;
				})
				.finally(res => {
					
				})
	}, [])

	return ( 
		<BannerSection bannerSection={bannerSection}/>
	);
}

export default Home;