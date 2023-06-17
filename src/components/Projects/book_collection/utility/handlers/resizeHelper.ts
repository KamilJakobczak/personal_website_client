export const resizeHelper = (
  width: number,
  setSize: (size: string) => void
) => {
  if (width >= 768) {
    if (width >= 1200) {
      setSize('big');
    } else {
      setSize('medium');
    }
  } else {
    setSize('small');
  }
};
