// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'
import {Swiper, Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation } from 'swiper';
Swiper.use([ Parallax, Mousewheel, Controller, Pagination, Scrollbar, Navigation ]);

import {gsap, Power2 } from 'gsap';

import MicroModal from 'micromodal';

document.addEventListener('DOMContentLoaded', () => {

//Modal


MicroModal.init({
  openTrigger: 'data-micromodal-open',
	closeTrigger: 'data-micromodal-close',
	disableFocus: true,
	disableScroll: true,
	awaitOpenAnimation: true,
	awaitCloseAnimation: true
});
    

// Swiper

	const swiperIMG = new Swiper ('.slider-img', {
		loop: false,
		speed: 2400,
		parallax: true,
		pagination: {
			el: '.slider-pagingation-count .total', 
			type: 'custom',
			renderCustom: function(swiper, current, total) {
				let totalRes = total >= 10 ? total : `0${total}`;
				return totalRes;
			}
		}
	})

const swiperText = new Swiper ('.slider-text', {
	loop: false,
	speed: 2400,
	mousewheel: {
		invert: false,
		},
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
	scrollbar: {
		el: '.swiper-scrollbar',
		draggable: true
	},
	navigation: {		
		prevEl: '.swiper-button-prev',
		nextEl: '.swiper-button-next',
	}
	})

	swiperIMG.controller.control = swiperText
	swiperText.controller.control = swiperIMG

// Gear

	let gear = document.querySelector('.slider-gear')

	swiperText.on('slidePrevTransitionStart', function() {
		gsap.to(gear, 2.8, {
			rotation: '+=40',
			ease: Power2.easeOut,
		})
	})

	swiperText.on('slideNextTransitionStart', function() {
		gsap.to(gear, 2.8, {
			rotation: '-=40',
			ease: Power2.easeOut,
		})
	})
	
	// Slide Change

	let curnumn = document.querySelector('.slider-pagingation-count .current'),
			pagcur  = document.querySelector('.slider-pagination-current__num');

	swiperText.on('slideChange', function() {
		let ind = 1 + swiperText.realIndex,
		indRes  = ind >= 10 ? ind : `0${ind}`
		gsap.to(curnumn, .2, {
			force3D: true,
			y: -10,
			opacity: 0,
			ease: Power2.easeOut,
			onComplete: function() {
				gsap.to(curnumn, .1, {
					force3D: true,
					y: 10
				})
				curnumn.innerHTML = indRes;
				pagcur.innerHTML = indRes;
			}
		})
		gsap.to(curnumn, .2, {
			force3D: true,
			y: 0,
			opacity: 1,
			ease: Power2.easeOut,
			delay: .3
		})
	})

})
