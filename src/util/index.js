export function mapKey(object, key) {
	const obj = {};
	for (let item in object) {
		obj[object[item][key]] = item;
	}
	return obj;
}

export const positionArr = [
	{ Place: 1, CNName: "上单", ENName: "top" },
	{ Place: 2, CNName: "中单", ENName: "middle" },
	{ Place: 3, CNName: "ADC", ENName: "bottom" },
	{ Place: 4, CNName: "辅助", ENName: "support" },
	{ Place: 5, CNName: "打野", ENName: "jungle" }
];
