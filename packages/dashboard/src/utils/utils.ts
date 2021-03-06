/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const ICONFONT_URL = '//at.alicdn.com/t/font_2586167_l9my9ou079s.js';

export const extractPostId = () => {
  const id = window.location.pathname.split('/').pop();
  if (id === 'editor') {
    return '';
  }
  return id;
};

export const makeTocs = (html: string) => {
  const el = document.createElement('html');
  el.innerHTML = html;
  const nodeList = el.querySelectorAll('h1,h2,h3,h4,h5,h6');
  nodeList.forEach((item, index) => {
    // eslint-disable-next-line no-param-reassign
    item.id = `heading--${index}`;
  });
  const tocReg = /<h([\d]) id="([^<]+)">([^<]+)<\/h([\d])>/gi;
  let ret = null;
  const toc = [];
  do {
    ret = tocReg.exec(el.innerHTML);
    if (ret) {
      toc.push({ level: ret[1], id: ret[2], text: ret[3] });
    }
  } while (ret !== null);
  return toc;
};
