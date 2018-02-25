export function mapKey(object, key) {
	const obj = {};
	for (let item in object) {
		obj[object[item][key]] = item;
	}
	return obj;
}
