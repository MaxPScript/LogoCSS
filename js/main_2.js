import { createLogo } from "./components/css_logo_svg.js";
import { defaultSetup } from "./components/default_setup.js";
import { createTudorButton } from "./components/tudor_button.js";
//
createTudorButton(65, svg_btn_id);
// function createLogo(logoValue, lettersValue, el, colors) {}
window.onload = function () {
	const { log } = console;
	log("main_3.js");
	//
	const colors = {
		regular_id: ["#663399", "#ffffff"],
		festive_id: ["#663399", "#ffffff", "#D42B2B", "#80D42B", "#2BD4D4"],
		light_id: ["#ffffff", "#000000"],
		dark_id: ["#000000", "#ffffff"],
	};
	//
	//
	const data = {
		checkbox: [],
		number: [],
		radio: [],
		radioChecked() {
			const radioChecked = this.radio.filter((_) => _.checked);
			return radioChecked;
		},
		svg: [],
		defaultNumberValues: [256, 4.5],
		radioValues: [256, 192, 128, 5.0, 4.5, 4.0],
		radioStates: [true, false, false, false, true, false],
	};
	//
	const checkboxes = document.querySelectorAll("input[type='checkbox']");
	const desktopInputs = document.querySelectorAll("input[type='number']");
	const mobileInputs = document.querySelectorAll("input[type='radio']");
	const svgs = document.querySelectorAll(".view svg:not(.test svg)");
	log(svgs);
	//
	function dataPush(nodeList) {
		nodeList.forEach(function (_, index) {
			let type = _.dataset.type;
			data[type].push(_);

			if (type === "checkbox") {
				_.addEventListener("click", checkboxHandler);
			}
			if (type === "number") {
				// _.addEventListener("input", numberHandler);
			}
			if (type === "radio") {
				_.addEventListener("change", radioHandler);
			}
			if (type === "svg") {
			}
		});
	}
	//
	dataPush(checkboxes);
	dataPush(desktopInputs);
	dataPush(mobileInputs);
	dataPush(svgs);
	//
	// default setup and reset
	defaultSetup(data, colors);
	const resetButton = document.querySelector("#reset");
	resetButton.addEventListener("click", function () {
		defaultSetup(data, colors);
	});
	//
	// handlers
	function checkboxHandler() {
		if (window.innerWidth >= 660) {
			checkboxes.forEach((chbx, index) => {
				if (chbx.checked) {
					// create svg with values from live number arr
					// and remove grayscale-filter effect
					svgs.forEach((svg, index) => {
						if (svg.getAttribute("id") == chbx.value) {
							createLogo(
								// data.number[0].value,
								// data.number[1].value,
								`${data.radioChecked()[0].value}`,
								`${data.radioChecked()[1].value}`,
								svg,
								colors
							);
							svg.closest("div").classList.remove("applied");
						} else {
						}
					});
				} else {
					// create default svg with values from data.defaultNumberValues arr
					// and apply grayscale-filter effect
					svgs.forEach((svg, index) => {
						if (svg.getAttribute("id") == chbx.value) {
							createLogo(
								data.defaultNumberValues[0],
								data.defaultNumberValues[1],
								svg,
								colors
							);
							svg.closest("div").classList.add("applied");
						} else {
						}
					});
				}
			});
		} else {
			checkboxes.forEach((chbx, index) => {
				if (chbx.checked) {
					// create svg with values from live radio inputs
					// and remove grayscale-filter effect
					svgs.forEach((svg, index) => {
						if (svg.getAttribute("id") == chbx.value) {
							createLogo(
								`${data.radioChecked()[0].value}`,
								`${data.radioChecked()[1].value}`,
								svg,
								colors
							);
							svg.closest("div").classList.remove("applied");
						} else {
						}
					});
				} else {
					// create default svg with values from data.defaultNumberValues arr
					// and apply grayscale-filter effect
					svgs.forEach((svg, index) => {
						if (svg.getAttribute("id") == chbx.value) {
							createLogo(
								data.defaultNumberValues[0],
								data.defaultNumberValues[1],
								svg,
								colors
							);
							svg.closest("div").classList.add("applied");
						} else {
						}
					});
				}
			});
		}
	}
	//
	// function numberHandler(ev) {
	// 	const _this = ev.target;
	// 	if (_this.step == 16) {
	// 		const min = +ev.target.min;
	// 		const max = +ev.target.max;
	// 		const step = +ev.target.step;
	// 		if (+_this.value < min || +_this.value > max) {
	// 			_this.value = data.defaultNumberValues[0];
	// 			alert("use arrows please");
	// 		} else {
	// 			if ((+_this.value - min) % step === 0) {
	// 				data.number[0].value = _this.value;
	// 				const checked = data.checkbox.filter((_) => _.checked);
	// 				svgs.forEach((svg, index) => {
	// 					let svgToDraw = null;
	// 					checked.forEach((_, index) => {
	// 						if (_.value == svg.getAttribute("id")) {
	// 							svgToDraw = svg;
	// 							createLogo(
	// 								data.number[0].value,
	// 								data.number[1].value,
	// 								svgToDraw,
	// 								colors
	// 							);
	// 						}
	// 					});
	// 				});
	// 			}
	// 		}
	// 	} else {
	// 		const min = 10 * ev.target.min;
	// 		const max = 10 * ev.target.max;
	// 		const step = 10 * ev.target.step;
	// 		if (10 * _this.value < min || 10 * _this.value > max) {
	// 			_this.value = data.defaultNumberValues[1];
	// 			alert("use arrows please");
	// 		} else {
	// 			if ((10 * _this.value - min) % step === 0) {
	// 				data.number[1].value = _this.value;
	// 				const checked = data.checkbox.filter((_) => _.checked);
	// 				svgs.forEach((svg, index) => {
	// 					let svgToDraw = null;
	// 					checked.forEach((_, index) => {
	// 						if (_.value == svg.getAttribute("id")) {
	// 							svgToDraw = svg;
	// 							createLogo(
	// 								data.number[0].value,
	// 								data.number[1].value,
	// 								svgToDraw,
	// 								colors
	// 							);
	// 						}
	// 					});
	// 				});
	// 			}
	// 		}
	// 	}
	// }
	//
	function radioHandler(ev) {
		const _this = ev.target;
		const checked = data.checkbox.filter((_) => _.checked);
		svgs.forEach((svg, index) => {
			let svgToDraw = null;
			checked.forEach((_, index) => {
				if (_.value == svg.getAttribute("id")) {
					svgToDraw = svg;
					createLogo(
						`${data.radioChecked()[0].value}`,
						`${data.radioChecked()[1].value}`,
						svg,
						colors
					);
				}
			});
		});
	}
};
