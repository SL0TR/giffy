import { PRIVATE_ROUTE } from 'router';
import { ReactComponent as FolderIcon } from './assets/folder.svg';
import { ReactComponent as GifIcon } from './assets/gif.svg';
import { ReactComponent as OptionIcon } from './assets/opinion.svg';

const options = [
  {
    key: PRIVATE_ROUTE.HOME,
    label: 'All Gifs',
    LeftIcon: OptionIcon,
    exact: true,
  },
  {
    key: PRIVATE_ROUTE.MY_GIFS,
    LeftIcon: FolderIcon,
    label: 'My GIFs',
  },
  {
    key: PRIVATE_ROUTE.VID_TO_GIF_PAGE,
    LeftIcon: GifIcon,
    label: 'Converter',
  },
];
export default options;
