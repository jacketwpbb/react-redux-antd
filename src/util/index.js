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

var tagBody = "(?:[^\"'>]|\"[^\"]*\"|'[^']*')*";

var tagOrComment = new RegExp(
	"<(?:" +
		// Comment body.
		"!--(?:(?:-*[^->])*--+|-?)" +
		// Special "raw text" elements whose content should be elided.
		"|script\\b" +
		tagBody +
		">[\\s\\S]*?</script\\s*" +
		"|style\\b" +
		tagBody +
		">[\\s\\S]*?</style\\s*" +
		// Regular name
		"|/?[a-z]" +
		tagBody +
		")>",
	"gi"
);

export function removeTags(html) {
	var oldHtml;
	do {
		oldHtml = html;
		html = html.replace(tagOrComment, "");
	} while (html !== oldHtml);
	return html.replace(/</g, "&lt;");
}
