export function createLogo(logoValue, lettersValue, el, colors) {
	const { log } = console;
	log("hello 5");
	// log(colors[el.getAttribute("id")]);
	const colorsArray = colors[el.getAttribute("id")];
	// log(el.getAttribute("id"));
	log(colorsArray);
	//
	el.innerHTML = `
		<title id="svgTitle"><!-- A new CSS logo --></title>
						<desc id="svgDesc">
							<!-- This SVG depicts the new CSS logo, featuring a Gothic-style,
							four-centered arc as the main design element. It creatively
							integrates shapes that represent both the overall logo and the
							letters of the word 'CSS.' -->
						</desc>


	`;
	// x="0"
	// 							y="0"
	const pointsTudorArch = {
		// p1: {
		//     x:0,
		//     y:0,
		// }
	};
	//
	// let springLine = 0;
	let springLine = logoValue;
	log(springLine);
	let k_1 = lettersValue; // Higher coefficients shrink letter dimensions.
	// the k coefficient for recalculating relative coordinates in letter paths
	let k = (k_1 * 100) / springLine;
	let logoShapeHeight = (springLine * 0.9) | 0;
	// Adjust SVG container width, height and viewBox
	el.setAttribute("width", springLine);
	el.setAttribute("height", logoShapeHeight);
	el.setAttribute("viewBox", `0 0 ${springLine} ${logoShapeHeight}`);
	//
	let unit = springLine / 4;
	const fillLogoShape = "#639";
	// A Tudor Arch features four arcs, with each pair being identical, which necessitates the use of two separate radii for construction.
	let radiusOfSmallTudorArch = unit;
	let radiusOfBigTudorArch = unit + Math.hypot(springLine, springLine / 2);
	let ratio =
		(radiusOfBigTudorArch - radiusOfSmallTudorArch) / radiusOfSmallTudorArch;
	let x = 0;
	let y = 0;
	pointsTudorArch.p1 = { x: x, y: y }; // point 1
	//
	// According to the theorems of similarity of triangles and the Pythagorean theorem.
	x = unit - (2 * unit) / ratio;
	y = springLine / ratio;
	pointsTudorArch.p2 = { x: x, y: y }; // point 2
	//
	x = unit * 2;
	y = Math.sqrt(radiusOfBigTudorArch ** 2 - unit ** 2) - springLine;
	pointsTudorArch.p3 = { x: x, y: y }; // point 3
	//
	// Since we start at coordinates (x: 0, y: 0) in the top-left corner of the SVG container,
	// we now need to shift our first three points downward.
	for (const p in pointsTudorArch) {
		pointsTudorArch[p].y = pointsTudorArch.p3.y - pointsTudorArch[p].y;
	}
	//
	// Let's construct the remaining two points needed to complete the Tudor Arch.
	x = (2 * unit) / ratio + 3 * unit;
	y = pointsTudorArch.p2.y;
	pointsTudorArch.p4 = { x: x, y: y }; // point 4
	x = springLine;
	y = pointsTudorArch.p1.y;
	pointsTudorArch.p5 = { x: x, y: y }; // point 5
	//
	function createLogoShape(obj) {
		let pathTemplate = `
		<path d="
            M${obj.p1.x} ${obj.p1.y}
            A${radiusOfSmallTudorArch} ${radiusOfSmallTudorArch} 0 0 1 ${
			obj.p2.x
		} ${obj.p2.y}
		    A${radiusOfBigTudorArch} ${radiusOfBigTudorArch} 0 0 1 ${obj.p3.x} ${
			obj.p3.y
		}
		    A${radiusOfBigTudorArch} ${radiusOfBigTudorArch} 0 0 1 ${obj.p4.x} ${
			obj.p4.y
		}
		    A${radiusOfSmallTudorArch} ${radiusOfSmallTudorArch} 0 0 1 ${obj.p5.x} ${
			obj.p5.y
		}
		    v${logoShapeHeight - obj.p5.y}
            h-${springLine}
            v${logoShapeHeight - obj.p5.y}
            z
		"
		 fill=${colorsArray[0]}
		>
        </path>
	    `;
		// fill=${fillLogoShape}
		el.insertAdjacentHTML("beforeend", pathTemplate);
	}
	createLogoShape(pointsTudorArch);
	//
	// Now let's create letters!

	springLine /= k_1; // letter width
	let letterHeight = springLine * 1.8;
	let logoShapePaddingBottom = springLine * 0.5;
	let gapBetweenLetters = springLine / 5;
	let logoShapePaddingLeft =
		(springLine * k_1 - 3 * springLine - 2 * gapBetweenLetters) / 2;
	//
	unit = springLine / 4;
	radiusOfSmallTudorArch = unit;
	radiusOfBigTudorArch = unit + Math.hypot(springLine, springLine / 2);
	ratio =
		(radiusOfBigTudorArch - radiusOfSmallTudorArch) / radiusOfSmallTudorArch;
	const pointsLetterC = {
		// p1: {
		// 	x: 0,
		// 	y: 0,
		// },
	};
	x = y = 0;
	pointsLetterC.p1 = { x: x, y: y }; // point 1
	//
	x = unit - (2 * unit) / ratio;
	y = springLine / ratio;
	pointsLetterC.p2 = { x: x, y: y }; // point 2
	//
	x = unit * 2;
	y = Math.sqrt(radiusOfBigTudorArch ** 2 - unit ** 2) - springLine;
	pointsLetterC.p3 = { x: x, y: y }; // point 3
	//
	for (const p in pointsLetterC) {
		pointsLetterC[p].y =
			logoShapeHeight -
			logoShapePaddingBottom -
			letterHeight +
			pointsLetterC.p3.y -
			pointsLetterC[p].y;
	}
	//
	x = (2 * unit) / ratio + 3 * unit;
	y = pointsLetterC.p2.y;
	pointsLetterC.p4 = { x: x, y: y }; // point 4
	x = springLine;
	y = pointsLetterC.p1.y;
	pointsLetterC.p5 = { x: x, y: y }; // point 5
	// shift on X axis
	for (const p in pointsLetterC) {
		pointsLetterC[p].x += logoShapePaddingLeft;
	}
	// In letter C 19 points
	function createLetterC(obj) {
		let pathTemplate = `
		<path d="
		M${obj.p1.x} ${
			obj.p1.y
		} A${radiusOfSmallTudorArch} ${radiusOfSmallTudorArch} 0 0 1 ${obj.p2.x} ${
			obj.p2.y
		}
		A${radiusOfBigTudorArch} ${radiusOfBigTudorArch} 0 0 1 ${obj.p3.x} ${obj.p3.y}
		A${radiusOfBigTudorArch} ${radiusOfBigTudorArch} 0 0 1 ${obj.p4.x} ${obj.p4.y}
		A${radiusOfSmallTudorArch} ${radiusOfSmallTudorArch} 0 0 1 ${obj.p5.x} ${
			obj.p5.y
		}
		v${3.6 / k} h${-34.4 / k} v${-12.5 / k} h${-31.25 / k} v${133.9 / k} a${
			6.25 / k
		} ${6.25 / k} 0 0 0 ${6.25 / k} ${6.25 / k} h${18.75 / k}
		a${6.25 / k} ${6.25 / k} 0 0 0 ${6.25 / k} ${-6.25 / k} v${-12.5 / k} h${
			34.38 / k
		} v${18.75 / k} a${18.75 / k} ${18.75 / k} 0 0 1 ${-18.75 / k} ${18.75 / k}
		h${-62.5 / k} a${18.75 / k} ${18.75 / k} 0 0 1 ${-18.75 / k} ${-18.75 / k} z
		"
		 fill="${colorsArray[1]}" ></path>
		`;
		el.insertAdjacentHTML("beforeend", pathTemplate);
		// ************************************
		if (colorsArray[2]) {
			let pathTemplate_2 = `
		<path d="

	M${obj.p1.x} ${obj.p1.y + 131.25 / k}
	h${100 / k}
	a${18.75 / k} ${18.75 / k} 0 0 1 ${-18.75 / k} ${18.75 / k}
	h${-62.5 / k}
	a${18.75 / k} ${18.75 / k} 0 0 1 ${-18.75 / k} ${-18.75 / k}
	z

		"
		fill="${colorsArray[2]}" ></path>
		`;

			el.insertAdjacentHTML("beforeend", pathTemplate_2);
		}
		// ***************************************
	}
	createLetterC(pointsLetterC);
	// create first letter S
	const pointsLetterFirstS = {
		// p1: {
		// 	x: 0,
		// 	y: 0,
		// },
	};
	x = y = 0;
	pointsLetterFirstS.p1 = { x: x, y: y }; // point 1
	x = unit - (2 * unit) / ratio;
	y = springLine / ratio;
	pointsLetterFirstS.p2 = { x: x, y: y }; // point 2
	x = unit * 2;
	y = Math.sqrt(radiusOfBigTudorArch ** 2 - unit ** 2) - springLine;
	pointsLetterFirstS.p3 = { x: x, y: y }; // point 3
	//
	for (const p in pointsLetterFirstS) {
		pointsLetterFirstS[p].y =
			logoShapeHeight -
			logoShapePaddingBottom -
			letterHeight +
			pointsLetterFirstS.p3.y -
			pointsLetterFirstS[p].y;
	}
	//
	x = (2 * unit) / ratio + 3 * unit;
	y = pointsLetterFirstS.p2.y;
	pointsLetterFirstS.p4 = { x: x, y: y }; // point 4
	x = springLine;
	y = pointsLetterFirstS.p1.y;
	pointsLetterFirstS.p5 = { x: x, y: y }; // point 5
	// shift on X axis
	for (const p in pointsLetterFirstS) {
		pointsLetterFirstS[p].x +=
			logoShapePaddingLeft + springLine + gapBetweenLetters;
	}
	//
	// In letter S 23 points
	function createFirstLetterS(obj) {
		let pathTemplate = `
		<path d="
		M${obj.p1.x} ${
			obj.p1.y
		} A${radiusOfSmallTudorArch} ${radiusOfSmallTudorArch} 0 0 1 ${obj.p2.x} ${
			obj.p2.y
		}
		A${radiusOfBigTudorArch} ${radiusOfBigTudorArch} 0 0 1 ${obj.p3.x} ${obj.p3.y}
		A${radiusOfBigTudorArch} ${radiusOfBigTudorArch} 0 0 1 ${obj.p4.x} ${obj.p4.y}
		A${radiusOfSmallTudorArch} ${radiusOfSmallTudorArch} 0 0 1 ${obj.p5.x} ${
			obj.p5.y
		}
		v${3.6 / k} h${-34.4 / k} v${-12.5 / k} h${-31.25 / k} v${42 / k} l${
			65.625 / k
		}, ${34.375 / k} v${63.73 / k}
		a${18.75 / k} ${18.75 / k} 0 0 1 ${-18.75 / k} ${18.75 / k} h${-62.5 / k} a${
			18.75 / k
		} ${18.75 / k} 0 0 1 ${-18.75 / k} ${-18.75 / k}
		v${-18.75 / k} h${34.375 / k} v${12.5 / k} a${6.25 / k} ${6.25 / k} 0 0 0 ${
			6.25 / k
		} ${6.25 / k} h${18.75 / k} a${6.25 / k} ${6.25 / k} 0 0 0 ${6.25 / k} ${
			-6.25 / k
		}
		v${-42.52 / k} l${-65.625 / k}, ${-34.375 / k} z
		"
		 fill="${colorsArray[1]}" ></path>
		`;
		el.insertAdjacentHTML("beforeend", pathTemplate);
		// ************************************
		if (colorsArray[3]) {
			let pathTemplate_2 = `
		<path d="

	M${obj.p1.x} ${obj.p1.y + 131.25 / k}
	h${100 / k}
	a${18.75 / k} ${18.75 / k} 0 0 1 ${-18.75 / k} ${18.75 / k}
	h${-62.5 / k}
	a${18.75 / k} ${18.75 / k} 0 0 1 ${-18.75 / k} ${-18.75 / k}
	z

		"
		fill="${colorsArray[3]}" ></path>
		`;

			el.insertAdjacentHTML("beforeend", pathTemplate_2);
		}
		// ***************************************
	}
	createFirstLetterS(pointsLetterFirstS);
	// create second letter S
	const pointsLetterSecondS = {
		// p1: {
		// 	x: 0,
		// 	y: 0,
		// },
	};
	x = y = 0;
	pointsLetterSecondS.p1 = { x: x, y: y }; // point 1
	x = unit - (2 * unit) / ratio;
	y = springLine / ratio;
	pointsLetterSecondS.p2 = { x: x, y: y }; // point 2
	x = unit * 2;
	y = Math.sqrt(radiusOfBigTudorArch ** 2 - unit ** 2) - springLine;
	pointsLetterSecondS.p3 = { x: x, y: y }; // point 3
	//
	for (const p in pointsLetterSecondS) {
		pointsLetterSecondS[p].y =
			logoShapeHeight -
			logoShapePaddingBottom -
			letterHeight +
			pointsLetterSecondS.p3.y -
			pointsLetterSecondS[p].y;
	}
	//
	x = (2 * unit) / ratio + 3 * unit;
	y = pointsLetterSecondS.p2.y;
	pointsLetterSecondS.p4 = { x: x, y: y }; // point 4
	x = springLine;
	y = pointsLetterSecondS.p1.y;
	pointsLetterSecondS.p5 = { x: x, y: y }; // point 5
	// shift on X axis
	for (const p in pointsLetterSecondS) {
		pointsLetterSecondS[p].x +=
			logoShapePaddingLeft + 2 * springLine + 2 * gapBetweenLetters;
	}
	//
	function createSecondLetterS(obj) {
		let pathTemplate = `
		<path d="
		M${obj.p1.x} ${
			obj.p1.y
		} A${radiusOfSmallTudorArch} ${radiusOfSmallTudorArch} 0 0 1 ${obj.p2.x} ${
			obj.p2.y
		}
		A${radiusOfBigTudorArch} ${radiusOfBigTudorArch} 0 0 1 ${obj.p3.x} ${obj.p3.y}
		A${radiusOfBigTudorArch} ${radiusOfBigTudorArch} 0 0 1 ${obj.p4.x} ${obj.p4.y}
		A${radiusOfSmallTudorArch} ${radiusOfSmallTudorArch} 0 0 1 ${obj.p5.x} ${
			obj.p5.y
		}
		v${3.6 / k} h${-34.4 / k} v${-12.5 / k} h${-31.25 / k} v${42 / k} l${
			65.625 / k
		}, ${34.375 / k} v${63.73 / k}
		a${18.75 / k} ${18.75 / k} 0 0 1 ${-18.75 / k} ${18.75 / k} h${-62.5 / k} a${
			18.75 / k
		} ${18.75 / k} 0 0 1 ${-18.75 / k} ${-18.75 / k}
		v${-18.75 / k} h${34.375 / k} v${12.5 / k} a${6.25 / k} ${6.25 / k} 0 0 0 ${
			6.25 / k
		} ${6.25 / k} h${18.75 / k} a${6.25 / k} ${6.25 / k} 0 0 0 ${6.25 / k} ${
			-6.25 / k
		}
		v${-42.52 / k} l${-65.625 / k}, ${-34.375 / k} z
		"
		 fill="${colorsArray[1]}" ></path>
		`;
		el.insertAdjacentHTML("beforeend", pathTemplate);
		// ************************************
		if (colorsArray[4]) {
			let pathTemplate_2 = `
		<path d="

	M${obj.p1.x} ${obj.p1.y + 131.25 / k}
	h${100 / k}
	a${18.75 / k} ${18.75 / k} 0 0 1 ${-18.75 / k} ${18.75 / k}
	h${-62.5 / k}
	a${18.75 / k} ${18.75 / k} 0 0 1 ${-18.75 / k} ${-18.75 / k}
	z

		"
		fill="${colorsArray[4]}" ></path>
		`;

			el.insertAdjacentHTML("beforeend", pathTemplate_2);
		}
		// ***************************************
	}
	createSecondLetterS(pointsLetterSecondS);
	//
	function createCirclesForTest(obj) {
		let circleTemplate = `
			<circle cx=${obj.x} cy=${obj.y} r="5" fill="green"></circle>
			`;
		el.insertAdjacentHTML("beforeend", circleTemplate);
	}
	for (const p in pointsLetterSecondS) {
		// createCirclesForTest(pointsLetterSecondS[p]);
	}
}
