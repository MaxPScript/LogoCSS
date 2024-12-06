// export function createTudorButton(logoValue, lettersValue, el, colors) {
export function createTudorButton(logoValue, el) {
	// const colorsArray = colors[el.getAttribute("id")];
	//
	el.innerHTML = `
		<title id="svgTitle">Button with Gothic shape</title>
		<desc id="svgDesc">
			This effort aims to design a button in an innovative gothic style.
		</desc>
                            `;
	// Reset
	const pointsTudorArch = {
		// p1: {
		//     x:0,
		//     y:0,
		// }
	};
	//
	let springLine = logoValue;
	// Higher coefficient shrink letter dimensions.
	// let k_1 = lettersValue;
	// the k coefficient for recalculating relative coordinates in letter paths
	// let k = (k_1 * 100) / springLine;
	let logoShapeHeight = (springLine * 0.5) | 0;
	// Adjust SVG container width, height and viewBox
	el.setAttribute("width", springLine);
	el.setAttribute("height", logoShapeHeight);
	el.setAttribute("viewBox", `0 0 ${springLine} ${logoShapeHeight}`);
	//
	let unit = springLine / 4;
	// const fillLogoShape = "#639";
	// A Tudor Arch features four arcs, with each pair being identical,
	// which necessitates the use of two separate radii for construction.
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
		>
        </path>
	    `;
		//
		el.insertAdjacentHTML("beforeend", pathTemplate);

		// text
		const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		text.setAttribute("x", 33);
		text.setAttribute("y", 26);
		text.setAttribute("font-size", "18");
		text.setAttribute("letter-spacing", "1.1");
		text.setAttribute("font-weight", "600");
		text.setAttribute("text-anchor", "middle");
		text.setAttribute("fill", "hsl(180, 55%, 38%)");
		text.setAttribute("stroke", "none");
		text.textContent = "Reset";
		//
		el.appendChild(text);
		// text
	}
	createLogoShape(pointsTudorArch);
	//
	// Move button to front
	const foreignObject = document.createElementNS(
		"http://www.w3.org/2000/svg",
		"foreignObject"
	);
	foreignObject.setAttribute("x", "0");
	foreignObject.setAttribute("y", "0");
	foreignObject.setAttribute("width", "100%");
	foreignObject.setAttribute("height", "100%");

	const button = document.createElementNS(
		"http://www.w3.org/1999/xhtml",
		"button"
	);
	button.setAttribute("id", "reset");

	foreignObject.appendChild(button);

	el.appendChild(foreignObject);

	//
}
