export const objectToQuery = (object: object) => {
	var str = [];
	for (var p in object)
		if (object.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(object[p]));
		}
	return str.join("&");
};
