export const getCookie = (cookieKey: string) => {
  if (document.cookie) {
    const cookie = document.cookie
      .split(';')
      .find(row => row.startsWith(`${cookieKey}=`));
    if (cookie) {
      const cookieValue = cookie.split('=')[1];
      return cookieValue;
    }
  }
};
