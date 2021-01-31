import { PRIVATE_ROUTE } from 'router';
import { ReactComponent as DashboardIcon } from './assets/darhboard-icon.svg';
import { ReactComponent as GifIcon } from './assets/gif.svg';

const options = [
  {
    key: PRIVATE_ROUTE.HOME,
    label: 'Dashboard',
    LeftIcon: DashboardIcon,
    exact: true,
  },
  {
    key: PRIVATE_ROUTE.VID_TO_GIF_PAGE,
    LeftIcon: GifIcon,
    label: 'Converter',
  },
];
export default options;
