import { helloFromMobileModule } from "./components/mobile.js";
import { createLogo } from "./components/css_logo_svg.js";
//

window.onload = function () {
	const { log } = console;
	//
	// const controlsInputs = document.querySelector(".controls_input");
	// log(controlsInputs);
	//
	const colors = {
		regular_id: ["#663399", "#ffffff"],
		festive_id: ["#663399", "#ffffff", "#D42B2B", "#80D42B", "#2BD4D4"],
		light_id: ["#ffffff", "#000000"],
		dark_id: ["#000000", "#ffffff"],
	};
	//
	const views = document.querySelectorAll(".regular, .festive, .light, .dark");
	views.forEach((_) => {
		_.classList.add("applied");
	});
	// log(views);
	// helloFromMobileModule();
	const checkboxes = document.querySelectorAll("input[type='checkbox']");
	// const imageTemplates = document.querySelectorAll(".view img");
	const svgTemplates = document.querySelectorAll(".view svg");
	//
	const desctopInputs = document.querySelectorAll("input[type='number']");
	const mobileInputs = document.querySelectorAll("input[type='radio']");
	mobileInputs.forEach((_) => {
		log(_);
	});
	//
	checkboxes.forEach((_) => {
		const svgToDrawIn = document.getElementById(`${_.value}`);
		createLogo(256, 4.5, svgToDrawIn, colors);
	});
	//
	checkboxes.forEach((_) => {
		if (_.checked) {
			log(_.value);
			// log()
			// const svgToDrawIn = document.getElementById(`${_.value}`);
			// createLogo(256, 4.4, svgToDrawIn, colors);
			// imageTemplates.forEach((img) => {
			// 	if (img.dataset.id == _.value) {
			// 		img.style.display = "none";
			// 	}
			// });
			svgTemplates.forEach((svg) => {
				if (svg.dataset.id != _.value) {
					// svg.style.display = "none";
				}
			});
		} else {
			// imageTemplates.forEach((img) => {
			// 	if (img.dataset.id == _.value) {
			// 		img.style.display = "none";
			// 	}
			// });
		}
	});
	checkboxes.forEach((_) => {
		_.addEventListener("click", (ev) => {
			const svgToDrawIn = document.getElementById(`${ev.target.value}`);
			const regex = /^regular(_id)?$/;
			log(svgToDrawIn); // svg
			log(ev.target); // checkbox
			log(ev);
			if (ev.target.checked) {
				// log(svgToDrawIn);
				// svgToDrawIn.style.display = "block";
				if (window.innerWidth < 660) {
					const dimensions = [];
					mobileInputs.forEach((_) => {
						if (_.checked) {
							dimensions.push(+_.value);
						} else {
							// dimensions.push(+_.value);
							// createLogo(256, 4.5, svgToDrawIn, colors);
						}
					});
					createLogo(dimensions[0], dimensions[1], svgToDrawIn, colors);
					views.forEach((_, index) => {
						if (ev.target.dataset.grayscale == index) {
							log("match!");
							_.classList.toggle("applied");
						}
					});
				}
				//
				// createLogo(128, 4.4, svgToDrawIn, colors);
				//
			} else {
				createLogo(256, 4.5, svgToDrawIn, colors);
				// const reg = document.querySelector(".regular");
				// reg.classList.add("applied");
				views.forEach((_, index) => {
					if (ev.target.dataset.grayscale == index) {
						log("not match!");
						_.classList.toggle("applied");
					}
				});
			}
		});
	});
	//
	// log(imageTemplates);
};
