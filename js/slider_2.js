window.onload = () => {
	const tabourets = document.querySelectorAll(".slides.tabouret img");
	const facades = document.querySelectorAll(".slides.facades img");
	function setInitialOpacity(images) {
		for (let i = 0; i < images.length; i++) {
			images[i].style.opacity = 0;
			images[images.length - 1].style.opacity = 1;
		}
	}
	setInitialOpacity(tabourets);
	setInitialOpacity(facades);
	let counterTaboret = 0;
	let counterFacade = 0;
	const btnPrevTabouret = document.querySelector(".prev.tabouret");
	const btnNextTabouret = document.querySelector(".next.tabouret");
	const btnPrevFacade = document.querySelector(".prev.facades");
	const btnNextFacade = document.querySelector(".next.facades");
	document.addEventListener("click", (ev) => {
		if (ev.target === btnNextTabouret) {
			counterTaboret++;
			// console.log(counterTaboret);
			if (counterTaboret === tabourets.length) {
				counterTaboret = tabourets.length - 1;
			}
			for (let i = 0; i < tabourets.length; i++) {
				tabourets[i].style.opacity = 0;
				tabourets[tabourets.length - 1 - counterTaboret].style.opacity = 1;
			}
		} else if (ev.target === btnPrevTabouret) {
			counterTaboret--;
			// console.log(counterTaboret);
			if (counterTaboret < 0) {
				counterTaboret = 0;
			}
			for (let i = 0; i < tabourets.length; i++) {
				tabourets[i].style.opacity = 0;
				tabourets[tabourets.length - 1 - counterTaboret].style.opacity = 1;
			}
		}
	});
	//
	document.addEventListener("click", (ev) => {
		if (ev.target === btnNextFacade) {
			counterFacade++;
			// console.log(counterFacade);
			if (counterFacade === facades.length) {
				counterFacade = facades.length - 1;
			}
			for (let i = 0; i < facades.length; i++) {
				facades[i].style.opacity = 0;
				facades[facades.length - 1 - counterFacade].style.opacity = 1;
			}
		} else if (ev.target === btnPrevFacade) {
			counterFacade--;
			// console.log(counterFacade);
			if (counterFacade < 0) {
				counterFacade = 0;
			}
			for (let i = 0; i < facades.length; i++) {
				facades[i].style.opacity = 0;
				facades[facades.length - 1 - counterFacade].style.opacity = 1;
			}
		}
	});
};
