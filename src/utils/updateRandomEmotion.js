export const updateRandomEmotion = (data) => {
	const newData = data.map((item) => ({
		...item,
		value: Math.floor(Math.random() * 101),
	}));
	const sum = newData.reduce((acc, curr) => acc + curr.value, 0);
	const targetSum = 100;
	newData.forEach((item) => {
		item.value = parseFloat(((item.value * targetSum) / sum).toFixed(6));
	});
	return newData;
};
