import { createLogo } from "./css_logo_svg.js";
//
// Set up SVGs for initial rendering and for resetting
// in other words:
// reset the values each time the page is reloaded,
// and initially render the SVG in a grayscaled and blurred state
export function defaultSetup(data, colors) {
	data.checkbox.forEach((_) => {
		_.checked = false;
	});
	data.number.forEach((_, index) => {
		_.value = data.defaultNumberValues[index];
	});
	data.radio.forEach((_, index) => {
		_.checked = data.radioStates[index];
	});
	data.svg.forEach((_) => {
		createLogo(256, 4.5, _, colors);
		_.closest("div").classList.add("applied");
	});
}
