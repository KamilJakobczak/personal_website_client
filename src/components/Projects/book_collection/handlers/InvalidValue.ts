export const invalidValue = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  clear?: boolean
): void => {
  const { name } = e.target;
  const lastChild = e.target.parentElement?.lastElementChild;
  if (lastChild && !lastChild.classList.contains('invalid_value_info')) {
    const element = document.createElement('span');
    element.classList.add('invalid_value_info');
    element.innerText = `Provided ${name} is invalid.`;
    e.target.parentElement?.appendChild(element);
    e.target.classList.add('invalid');
  }
  if (clear) {
    e.target.parentElement?.querySelector('.invalid_value_info')?.remove();
    e.target.classList.remove('invalid');
  }
};
