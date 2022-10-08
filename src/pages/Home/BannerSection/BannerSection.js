import styles from "./BannerSection.module.css";
import classNames from "classnames/bind";
import parse from 'html-react-parser';
import { useRef } from "react";

const cx = classNames.bind(styles)

function BannerSection({bannerSection}) {
	const isEmpty = Object.keys(bannerSection).length <= 0;
	const backgroundImage = !isEmpty && bannerSection.background.sourceUrl;

	return ( 
		<section 
			style={
				{
					backgroundImage: `url(${backgroundImage})`,
				}
			} 
			className={cx('banner-section')}
		>
			<div className="container">
				<div className="banner-section_content">
					<div className="banner-section_content-content">
							{!isEmpty && parse(bannerSection.content)}
					</div>
					<div className={cx('banner-section_content-img')}>
						<img width={300} height={300} src={!isEmpty === true ? bannerSection.image.sourceUrl : ""} alt="Banner"/>
					</div>
				</div>
				<div className="banner-section_figure"></div>
			</div>
			
		</section>
	);
}

export default BannerSection;