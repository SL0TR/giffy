import { message } from 'antd';

export const customRequest = ({ _, onSuccess }) => {
  setTimeout(() => {
    onSuccess('ok', _);
  }, 0);
};

export function getValidVideoFile(file, messages = {}) {
  const isVideoFile = file.type === 'video/mp4';

  if (!isVideoFile) {
    message.error(messages['You can only upload Mp4 video files!']);
  }

  // Max filesize 5MB
  const isSizeValid = file.size / 1024 / 1024 < 10;

  if (!isSizeValid) {
    message.error(messages['Video must smaller than 10MB!']);
  }
  return isVideoFile && isSizeValid;
}
