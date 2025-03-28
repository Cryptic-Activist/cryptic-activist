export const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

export const hexToRGB = (h: string) => {
	let r: number | string = 0,
		g: number | string = 0,
		b: number | string = 0;

	// 3 digits
	if (h.length == 4) {
		r = "0x" + h[1] + h[1];
		g = "0x" + h[2] + h[2];
		b = "0x" + h[3] + h[3];

		// 6 digits
	} else if (h.length == 7) {
		r = "0x" + h[1] + h[2];
		g = "0x" + h[3] + h[4];
		b = "0x" + h[5] + h[6];
	}

	return "rgb(" + +r + "," + +g + "," + +b + ")";
};

export const RGBToHSV = (rgb) => {
	let sep = rgb.indexOf(",") > -1 ? "," : " ";
	rgb = rgb.substr(4).split(")")[0].split(sep);

	for (let R in rgb) {
		let r = rgb[R];
		if (r.indexOf("%") > -1)
			rgb[R] = Math.round((r.substr(0, r.length - 1) / 100) * 255);
	}

	// Make r, g, and b fractions of 1
	let r = rgb[0] / 255,
		g = rgb[1] / 255,
		b = rgb[2] / 255;

	return "hsv(" + +r + "," + +g + "," + +b + ")";
};

export const generateAvatar = (text: string) => {
	const canvas = document.createElement("canvas");
	const context = canvas.getContext("2d");

	canvas.width = 200;
	canvas.height = 200;

	// Draw background
	context.fillStyle = getRandomColor();
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw text
	context.font = "bold 100px Assistant";
	context.fillStyle = getRandomColor();
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText(text, canvas.width / 2, canvas.height / 2);

	return canvas.toDataURL("image/png");
};
