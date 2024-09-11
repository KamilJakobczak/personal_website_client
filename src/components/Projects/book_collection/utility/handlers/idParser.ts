export const idParser = (item: { id: string }[]) => {
  const idArr: string[] = [];
  for (let i = 0; i < item.length; i++) {
    const element = item[i];
    idArr.push(element.id);
  }
  return idArr;
};
