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
	checkboxes.forEach((_) => {
		_.checked = false;
	});
	// const imageTemplates = document.querySelectorAll(".view img");
	const svgTemplates = document.querySelectorAll(".view svg");
	//
	const desktopInputs = document.querySelectorAll("input[type='number']");
	const mobileInputs = document.querySelectorAll("input[type='radio']");
	mobileInputs.forEach((_) => {
		// log(_);
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
			// const regex = /^regular(_id)?$/;
			log(svgToDrawIn); // svg
			log(ev.target); // checkbox
			log(ev);
			if (ev.target.checked) {
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
			} else {
				if (window.innerWidth < 660) {
					createLogo(256, 4.5, svgToDrawIn, colors);
					views.forEach((_, index) => {
						if (ev.target.dataset.grayscale == index) {
							log("not match!");
							_.classList.toggle("applied");
						}
					});
				}
			}
		});
	});
	//
	//
	//
	if (window.innerWidth >= 660) {
		const data = {
			svgToDrawIn: "",
			isChecked: false,
			dimensions: [],
			_this: [],
		};
		//
		// desktopInputs.forEach((_) => {
		// 	data.dimensions.push(+_.value);
		// });
		//
		checkboxes.forEach((_) => {
			_.addEventListener("click", checkboxFunction);
		});
		function checkboxFunction(ev) {
			// data._this = ev.target;
			data._this.push(ev.target);
			log(data._this);
			data.dimensions.length = 0;
			desktopInputs.forEach((_) => {
				data.dimensions.push(+_.value);
			});
			log(data);
			const svgToDrawIn = document.getElementById(`${this.value}`);
			log(data);
			createLogo(data.dimensions[0], data.dimensions[1], svgToDrawIn, colors);
			// When any checkbox is checked, the grayscale and blur effects are removed,
			// and the SVG is drawn using the dimensions provided by the desktop inputs (span line width and letters width)
			views.forEach((_, index) => {
				if (this.checked && this.dataset.grayscale == index) {
					log("match!");
					_.classList.remove("applied");
				} else if (!this.checked && this.dataset.grayscale == index) {
					_.classList.add("applied");
					createLogo(256, 4.5, svgToDrawIn, colors);
				}
			});
		}
		desktopInputs.forEach((_) => {
			_.addEventListener("input", desktopInputsFunction);
		});
		function desktopInputsFunction() {
			data.dimensions.length = 0;
			desktopInputs.forEach((_) => {
				data.dimensions.push(+_.value);
			});
			const svgToDrawIn = document.getElementById(`${data._this.value}`);
			//
			views.forEach((_, index) => {
				//
				data._this.forEach((checkbox) => {
					if (checkbox.checked && checkbox.dataset.grayscale == index) {
						log("match!");
						_.classList.remove("applied");
						log(data.dimensions);
						log(svgToDrawIn);
						createLogo(
							data.dimensions[0],
							data.dimensions[1],
							svgToDrawIn,
							colors
						);
					} else if (!checkbox.checked && checkbox.dataset.grayscale == index) {
						_.classList.add("applied");
						// createLogo(dimensions[0], dimensions[1], svgToDrawIn, colors);
					}
				});
				//
			});
		}
	}
	//
	//
	//
	// checkboxes.forEach((_) => {
	// 	_.addEventListener("click", (ev) => {
	// 		const svgToDrawIn = document.getElementById(`${ev.target.value}`);
	// 		if (ev.target.checked) {
	// 			if (window.innerWidth >= 660) {
	// 				const dimensions = [];
	// 				desktopInputs.forEach((_, index) => {
	// 					dimensions.push(+_.value);
	// 					_.addEventListener("input", () => {
	// 						dimensions[index] = _.value;
	// 						createLogo(dimensions[0], dimensions[1], svgToDrawIn, colors);
	// 						views.forEach((_, index) => {
	// 							if (ev.target.dataset.grayscale == index) {
	// 								log("match!");
	// 								_.classList.remove("applied");
	// 							}
	// 						});
	// 					});
	// 				});
	// 			}
	// 		}
	// 	});
	// });
	// log(imageTemplates);
};
