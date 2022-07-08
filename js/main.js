"use strict"
// Ждем загрузку контента
window.onload = function () {
	const parallax = document.querySelector('.parallax');

	if (parallax) {
		const content = document.querySelector('.parallax__container');
		const clouds1 = document.querySelector('.images-parallax__clouds1');
		const clouds2 = document.querySelector('.images-parallax__clouds2');
		const mountainGreen = document.querySelector('.images-parallax__mountain-green');
		const mountainYellow = document.querySelector('.images-parallax__mountain-yellow');
		const landscape = document.querySelector('.images-parallax__landscape');

		// Коэффициенты
		const forClouds = 40;
		const forMountains = 20;
		const forlandscape = 10;

		// Скорость анимации
		const speed = 0.05;

		// Объявление переменных
		let positionX = 0, positionY = 0;
		let coordXprocent = 0, coordYprocent = 0;

		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);

			// Передаем стили
			clouds1.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
			clouds2.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
			mountainGreen.style.cssText = `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%);`;
			mountainYellow.style.cssText = `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%);`;
			landscape.style.cssText = `transform: translate(${positionX / forlandscape}%,${positionY / forlandscape}%);`;

			requestAnimationFrame(setMouseParallaxStyle);
		}
		setMouseParallaxStyle();

		parallax.addEventListener("mousemove", function (e) {
			// Получение ширины и высоты блока
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			// Ноль по середине
			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			// Получаем проценты
			coordXprocent = coordX / parallaxWidth * 100;
			coordYprocent = coordY / parallaxHeight * 100;
		});

		// Parallax при скролле

		let thresholdSets = [];
		for (let i = 0; i <= 1.0; i += 0.005) {
			thresholdSets.push(i);
		}
		const callback = function (entries, observer) {
			const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
			setParallaxItemsStyle(scrollTopProcent);
		};
		const observer = new IntersectionObserver(callback, {
			threshold: thresholdSets
		});

		observer.observe(document.querySelector('.content'));

		function setParallaxItemsStyle(scrollTopProcent) {
			content.style.cssText = `transform: translate(0%,-${scrollTopProcent / 9}%);`;
			mountainGreen.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
			mountainYellow.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
			landscape.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
		}


	}
}

