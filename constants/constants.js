import fbLogo from '../resources/img/fb_logo.png';
import igLogo from '../resources/img/ig_logo.png';
import inLogo from '../resources/img/in_logo.png';
import vkLogo from '../resources/img/vk_logo.png';

export const TERMS_PAGE_NAME = 'Правила пользования';
export const AGREEMENT_PAGE_NAME = 'Договор оферты';

export const VIEW_TYPE_TILE = 'tile';
export const VIEW_TYPE_LIST = 'list';

export const REGISTER_URL = 'register';

const FACEBOOK = {
  id: 1,
  name: 'facebook',
  link: 'https://www.facebook.com',
  img: fbLogo,
};

const INSTAGRAM = {
  id: 2,
  name: 'instagram',
  link: 'https://www.instagram.com',
  img: igLogo,
};
const VK = {
  id: 3,
  name: 'vk',
  link: 'https://vk.com',
  img: vkLogo,
};
const LINKEDIN = {
  id: 4,
  name: 'linkedin',
  link: 'https://www.linkedin.com',
  img: inLogo,
};

export const SOCIAL_NETWORKS = [FACEBOOK, INSTAGRAM, VK, LINKEDIN];
