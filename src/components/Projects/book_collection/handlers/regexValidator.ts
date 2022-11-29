export const regexValidator = (
  regex: RegExp,
  value: string,
  setter: (arg0: string) => void
) => {
  const regexCheck = value.match(regex);
  if (!regexCheck) {
    if (value.length === 0) {
      setter('');
    }
  } else {
    setter(value);
  }
};
