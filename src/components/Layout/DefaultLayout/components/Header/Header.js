import { useEffect, useState } from 'react'
import { logoAPI, primaryMenuAPI } from '../../api/api'
import { flatListToHierarchical } from '~/utils'
import styles from './Header.module.css';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {

	const [logo, setLogo] = useState('');
	const [menuItems, setMenuItems] = useState([]);

	useEffect(() => {
		logoAPI().then(res => setLogo(res))
	}, [])

	useEffect(() => {
		primaryMenuAPI().then(res => flatListToHierarchical(res))
										.then(res => setMenuItems(res))
	}, [])

	return ( 
		<div className={cx('header')}>
			<div className="container">
				<div className={cx('header-content')}>
					<div className={cx('logo')}>
						<Link to="/"><img src={logo} alt="Logo"/></Link>
					</div>
					<div className={cx('menu')}>
						<ul className={cx('page-list')}>
							{menuItems.map((menuItem, index) => {
								const is_parent = menuItem.childItems.edges.length > 0 ? true : false
								return (
									<li key={menuItem.id} className={is_parent ? cx('parent-page', 'page-link', menuItem.uri.split('/').join('')) : cx('page-link')}>
										<Link to={menuItem.uri}><h6>{menuItem.label}</h6></Link>
										{
											is_parent &&
											<div className={cx('box-list')}>
													<ul className={cx('child-page-list')}>
														{menuItem.childItems.edges.map((childItem, index) => (
															<li className={cx('child-page')} key={childItem.node.id}>
																<Link to={childItem.node.uri}>
																	{childItem.node.label}
																</Link>
															</li>
														))}
													</ul>
											</div>
										}
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;

