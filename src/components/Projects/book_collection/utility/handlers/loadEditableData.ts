export function loadEditableData(
	arr: string[] | null,
	setItemState: React.Dispatch<React.SetStateAction<string[]>>,
	setCounterState: React.Dispatch<React.SetStateAction<number[]>>
) {
	if (arr) {
		if (arr.length === 0) {
			return;
		}

		const newItemState: string[] = [];
		const newCounterState: number[] = [];
		arr.forEach((element, index) => {
			newItemState.push(element);
			newCounterState.push(index);
		});
		setItemState(newItemState);
		setCounterState(newCounterState);
	}
}
