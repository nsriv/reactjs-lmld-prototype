'use strict';

import Logo from '../components/Logo';

class LogoHome extends Logo {

	constructor(props) {
		super(props);
	}

	componentDidMount() {

		this.mainLogo = document.querySelector('header .logo-container');
		this.mainLogoTitle = this.mainLogo.querySelector('.title');
		this.homeLogo = document.querySelector('.content .logo-container');
		this.homeLogoTitle = this.homeLogo.querySelector('.title');
		this.header = document.querySelector('header');
		this.mainLogo.style.opacity = 0;

		// initialise the scroll magic
		// todo: move this to ES6 module `import`
		// currently injected on the html index file
		this.initScrollMagic();

	}

	componentWillUnmount() {
		// reset visibility
		window.TweenLite.to(this.mainLogo, 0.3, { css: { opacity: 1 } });

		// Destroy scroll magic instance
		//this.scrollMagicController.destroy(true);
		//this.scrollMagicController = null;

		this.props.removeSceneFromScrollMagicController('logoHome');
	}

	initScrollMagic() {

		// Logo switcher timeline
		let tl = new window.TimelineLite({
			onStart: null,
			onComplete: null,
			onReverseComplete: null
		});

		tl.to(this.mainLogo, 0.1, { opacity: 1 });
		tl.to(this.homeLogo, 0.1, { opacity: 0 });
		tl.set(this.header, { className: '+=bg' });

		// declare timeline to controller
		let sc1 = new window.ScrollMagic.Scene({
				triggerElement: this.homeLogo,
				triggerHook: 'onLeave',
				duration: '1px'
			})
			.setTween(tl);

		// title fade tween
		let titleFadeTween = window.TweenLite.to(this.homeLogoTitle, 0.5, { opacity: 0 });

		// declare tween to controller
		let sc2 = new window.ScrollMagic.Scene({
				triggerHook: 'onLeave',
				duration: '25%'
			})
			.setTween(titleFadeTween);

		setTimeout(() => {
			this.props.addToScrollMagicController({'logoHome': [sc1, sc2] });
		}, 0);

	}


}

export default LogoHome;