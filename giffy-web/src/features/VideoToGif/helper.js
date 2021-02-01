export const customRequest = ({ _, onSuccess }) => {
  setTimeout(() => {
    onSuccess('ok', _);
  }, 0);
};
