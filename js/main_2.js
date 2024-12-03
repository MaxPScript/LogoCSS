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
		radioValues: [true, false, false, false, true, false],
	};
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
				_.checked = false;
			}
			if (type === "number") {
				data[type][index].value = data.numberValues[index];
			}
			if (type === "radio") {
				data[type][index].checked = data.radioValues[index];
			}
			if (type === "svg") {
				data[type][index].closest("div").classList.add("applied");
				createLogo(256, 4.5, data[type][index], colors);
			}
		});
	}
	dataPush(checkboxes);
	dataPush(desktopInputs);
	dataPush(mobileInputs);
	dataPush(svgs);
	// log(data);
};
