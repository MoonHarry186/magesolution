import styles from './Footer.module.css';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react'
import {
	firstFooterMenu, 
	secondFooterMenu,
	footerDataAPI
} from '../../api/api'
import { Link } from 'react-router-dom'
import MailchimpSubscribe from 'react-mailchimp-subscribe'

const cx = classNames.bind(styles)

const MailChimpForm = ({status, message, onValidated}) => {
	const buttonRef = useRef();
	const inputRef = useRef();
	let email;
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
	});

	const buttonHandleClick = (e) => {
		submit();
		inputRef.current.firstChild.value = '';
		inputRef.current.firstChild.focus();
	}

	const handleOnKeyDown = (e) => {
		if (e.which === 13 ) {
			submit();
			inputRef.current.firstChild.value = '';
			inputRef.current.firstChild.focus();
		}
	}

	return (
		<div className={cx('mailchimp-form')}>
			<div ref={inputRef} className={cx('input-box')}>
				<input ref={(node) => (email = node)} onKeyDown={(e) => handleOnKeyDown(e)} type="email" placeholder="example@gmail.com"></input>
				<button ref={buttonRef}  onClick={(e) => buttonHandleClick(e)}></button>
			</div>
			{status === "sending" && <div className={cx('sending', 'message')} style={{ color: "blue" }}>Sending...</div>}
			{status === "error" && (
			<div
				className={cx('error', 'message')}
				style={{ color: "red" }}
				dangerouslySetInnerHTML={{ __html: message }}
			/>
			)}
			{status === "success" && (
				<div
					className={cx('success', 'message')}
					style={{ color: "green" }}
					dangerouslySetInnerHTML={{ __html: message }}
				/>
			)}
		</div>
	)
}

function Footer() {
	const [firstMenuItems, setFirstMenuItems] = useState([]);
	const [secondMenuItems, setSecondMenuItems] = useState([]);
	const [footerData, setFooterData] = useState({mailchimpUrl:''});

	useEffect(() => {
		footerDataAPI().then(res => setFooterData(res))
	}, [])

	useEffect(() => {
		firstFooterMenu().then(res => setFirstMenuItems(res))
	}, [])

	useEffect(() => {
		secondFooterMenu().then(res => setSecondMenuItems(res))
	}, [])

	return ( 
		<div className={cx('footer')}>
			<div className='container'>
				<div className={cx('footer-top')}>
					<div className={cx('logo')}>
						<Link to="/"><img src={footerData.topLogo} alt="Logo"/></Link>
					</div>
					<div className={cx('menu-1')}>
						<ul className={cx('first-footer-menu', 'footer-menu')}>
								{firstMenuItems.map((menuItem, index) => (
									<li key={menuItem.id}><Link to={menuItem.uri}><h6>{menuItem.label}</h6></Link></li>
								))}
						</ul>
					</div>
					<div className={cx('menu-2')}>
					<ul className={cx('second-footer-menu', 'footer-menu')}>
								{secondMenuItems.map((menuItem, index) => (
									<li key={menuItem.id}><Link to={menuItem.uri}><h6>{menuItem.label}</h6></Link></li>
								))}
						</ul>
					</div>
					<div className={cx('newsletter')}>
						<h6 >{footerData.newsletterTitle}</h6>
						<h6 className={cx('news-desc')}>{footerData.newsletterDesc}</h6>
						<MailchimpSubscribe 
							url={footerData.mailchimpUrl}
							render={({ subscribe, status, message }) => (
								<MailChimpForm
									status={status}
									message={message}
									onValidated={formData => subscribe(formData)}
								/>
							)}
							/>
					</div>
				</div>
				<div className={cx('footer-bottom')}>
					<div  className={cx('footer-logo')}>
						<a href='https://www.arrowhitech.com/' target="_blank" rel="noreferrer"><img src={footerData.bottomLogo} alt='Footer Logo'/></a>
					</div>
					<div className={cx('copyright')}>
							<p>{footerData.copyright}</p>
					</div>
				</div>
			</div>			
		</div>
	);
}

export default Footer;