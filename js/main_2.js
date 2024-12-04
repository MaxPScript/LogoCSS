import { createLogo } from "./components/css_logo_svg.js";
// function createLogo(logoValue, lettersValue, el, colors) {}
window.onload = function () {
	const { log } = console;
	log("main_2.js");
	//
	const colors = {
		regular_id: ["#663399", "#ffffff"],
		festive_id: ["#663399", "#ffffff", "#D42B2B", "#80D42B", "#2BD4D4"],
		light_id: ["#ffffff", "#000000"],
		dark_id: ["#000000", "#ffffff"],
	};
	//
	const data = {
		checkbox: [],
		number: [],
		radio: [],
		svg: [],
		numberValues: [256, 4.5],
		radioValues: [256, 192, 128, 5.0, 4.5, 4.0],
		radioStates: [true, false, false, false, true, false],
	};
	//
	// Set up SVGs for initial rendering and for resetting
	function defaultSetup() {
		data.checkbox.forEach((_) => {
			_.checked = false;
			// _.addEventListener("click", checkboxHandler);
		});
		data.number.forEach((_, index) => {
			// _.checked = false;
			// data[type][index].value = data.numberValues[index];
			_.value = data.numberValues[index];
			// log(data.numberValues[index]);
			// _.value = data.number[index].value;
			// _.addEventListener("click", numberHandler);
		});
		data.radio.forEach((_, index) => {
			_.checked = data.radioStates[index];
			// _.addEventListener("change", radioHandler);
		});
		data.svg.forEach((_) => {
			createLogo(256, 4.5, _, colors);
			_.closest("div").classList.add("applied");
		});
	}
	const resetButton = document.querySelector("#reset");
	resetButton.addEventListener("click", defaultSetup);
	//
	//
	const checkboxes = document.querySelectorAll("input[type='checkbox']");
	const desktopInputs = document.querySelectorAll("input[type='number']");
	const mobileInputs = document.querySelectorAll("input[type='radio']");
	const svgs = document.querySelectorAll(".view svg");
	//
	function dataPush(nodeList) {
		nodeList.forEach(function (_, index) {
			let type = _.dataset.type;
			data[type].push(_);
			// reset the values each time the page is reloaded,
			// and initially render the SVG in a grayscaled and blurred state
			if (type === "checkbox") {
				// _.checked = false;
				_.addEventListener("click", checkboxHandler);
			}
			if (type === "number") {
				// data[type][index].value = data.numberValues[index];
				_.addEventListener("input", numberHandler);
			}
			if (type === "radio") {
				// data[type][index].checked = data.radioStates[index];
				_.addEventListener("change", radioHandler);
			}
			if (type === "svg") {
				// data[type][index].closest("div").classList.add("applied");
				// createLogo(256, 4.5, data[type][index], colors);
				// defaultSetup();
			}
		});
	}

	//
	dataPush(checkboxes);
	dataPush(desktopInputs);
	dataPush(mobileInputs);
	dataPush(svgs);
	//
	defaultSetup();

	//
	// function getStyles() {}
	log(data);
	function checkboxHandler(ev) {
		// log(ev.target);
		// log(data.svg);
		let svg = document.querySelector(`#${ev.target.value}`);
		svg.closest("div").classList.toggle("applied");
		//
		if (window.innerWidth < 660) {
			if (ev.target.checked) {
				const radioCheckedValues = data.radio.filter((_) => _.checked);
				// log(radioCheckedValues);
				createLogo(
					radioCheckedValues[0].value,
					radioCheckedValues[1].value,
					svg,
					colors
				);
				// log(data.radio);
			} else {
				log("not checked");
			}
		} else {
			// const numberCheckedValues = data.number.filter((_) => _.checked);
			// log(numberCheckedValues);
			createLogo(data.numberValues[0], data.numberValues[1], svg, colors);
			// log(data.radio);
		}
		//
	}
	function numberHandler(ev) {
		// log(ev.target);
		const _this = ev.target;
		// desktopInputs.forEach((_, index) => {
		if (_this.step == 16) {
			const min = +ev.target.min;
			const max = +ev.target.max;
			const step = +ev.target.step;

			if (+_this.value < min || +_this.value > max) {
				_this.value = data.numberValues[0];
			} else {
				if ((+_this.value - min) % step === 0) {
					// data.number[index].value = +_this.value;
					// log(data.number[index].value);
					log(_this.value);
					// log(data.number);
					const checked = data.checkbox.filter((_) => _.checked);
					// log(checked);
					// checked.value
					svgs.forEach((svg, index) => {
						// data.number
						let svgToDraw = null;
						checked.forEach((_, index) => {
							if (_.value == svg.getAttribute("id")) {
								svgToDraw = svg;
								createLogo(
									data.number[0].value,
									data.number[1].value,
									svgToDraw,
									colors
								);
								//
								resetSvgIfCheckboxIsNotChecked();
							}
						});
					});
				} else {
					_this.value = data.numberValues[0];
				}
			}
		}

		// });
		//

		log(ev.target.value);
		// createLogo(data.numberValues[0], data.numberValues[1], _, colors);
	}
	//
	//
	function radioHandler(ev) {
		log(ev.target.value);
	}
	//
	function resetSvgIfCheckboxIsNotChecked() {
		const checked = data.checkbox.filter((_) => !_.checked);
		log(checked);
		svgs.forEach((svg, index) => {
			// data.number
			let svgToDraw = null;
			checked.forEach((_, index) => {
				if (_.value == svg.getAttribute("id")) {
					svgToDraw = svg;
					// log(data.numberValues);
					createLogo(
						data.numberValues[0],
						data.numberValues[1],
						svgToDraw,
						colors
					);
				}
			});
		});
	}
};
