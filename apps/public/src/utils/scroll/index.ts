export const scrollSmothly = (top: number): void => {
	window.scrollTo({
		top,
		behavior: "smooth",
	});
};
