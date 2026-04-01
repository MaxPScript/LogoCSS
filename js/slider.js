const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");

let index = 0;
let startX = 0;
let endX = 0;

function update() {
	slides.style.transform = `translateX(${-index * 100}%)`;
}

document.querySelector(".next").onclick = () => {
	console.log(`next`);
	index = (index + 1) % images.length;
	update();
};

document.querySelector(".prev").onclick = () => {
	console.log(`prev`);
	index = (index - 1 + images.length) % images.length;
	update();
};

slides.addEventListener("touchstart", (e) => {
	startX = e.touches[0].clientX;
});

slides.addEventListener("touchend", (e) => {
	endX = e.changedTouches[0].clientX;

	if (startX - endX > 50) {
		index = (index + 1) % images.length;
	}

	if (endX - startX > 50) {
		index = (index - 1 + images.length) % images.length;
	}

	update();
});
