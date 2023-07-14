const { getLabelByName, create } = require("../service/label.service");
const verifyLabelExist = async (ctx, next) => {
	//1.取出要添加的所有的标签
	const { labels } = ctx.request.body;

	//2.判断标签是否存在
	const newLabels = [];
	for (let name of labels) {
		const labelResult = await getLabelByName(name);
		const label = { name };
		if (!labelResult) {
			//不存在就要创建标签
			const result = await create(name);
			label.id = result.insertId;
    } else {
			label.id = labelResult.id;
		}
		newLabels.push(label);
	}
	ctx.labels = newLabels;

	await next();
};
module.exports = { verifyLabelExist };
