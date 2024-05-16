// interface checkURLProps {
//   link: string
// }

export const checkURL = (link: string) => {
  if (link.indexOf('https://') !== -1 || link.indexOf('http://') !== -1) {
    return link;
  } else {
    return `https://${link}`;
  }
};
