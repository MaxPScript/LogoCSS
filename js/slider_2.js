window.onload = () => {
	let shift = 100;
	const tabourets = document.querySelectorAll(".slides.tabouret img");
	for (let i = 0; i < tabourets.length; i++) {
		tabourets[i].style.opacity = 0;
		// tabourets[tabourets.length - 1 - counter].style.opacity = 1;
		tabourets[tabourets.length - 1].style.opacity = 1;
	}
	console.log(tabourets[0]);
	let counter = 0;
	// tabourets[counter].style.opacity = 1;
	const btnPrev = document.querySelector(".prev");
	const btnNext = document.querySelector(".next");
	// console.log(btnPrev, btnNext);
	document.addEventListener("click", (ev) => {
		if (ev.target === btnNext) {
			counter++;
			console.log(counter);
			if (counter === tabourets.length) {
				counter = tabourets.length - 1;
			}
			for (let i = 0; i < tabourets.length; i++) {
				tabourets[i].style.opacity = 0;
				tabourets[tabourets.length - 1 - counter].style.opacity = 1;
			}
		} else if (ev.target === btnPrev) {
			counter--;
			console.log(counter);
			if (counter < 0) {
				counter = 0;
			}
			for (let i = 0; i < tabourets.length; i++) {
				tabourets[i].style.opacity = 0;
				tabourets[tabourets.length - 1 - counter].style.opacity = 1;
			}
		}
	});
};
