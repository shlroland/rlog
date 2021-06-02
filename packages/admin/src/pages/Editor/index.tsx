import type { FC } from 'react';
import { useEffect } from 'react';
import Vditor from 'vditor';
import './index.scss';

const ArticleEditor: FC = () => {
  useEffect(() => {
    const vditor = new Vditor('vditorId');
    console.log(vditor);
  }, []);

  return (
    <>
      <div className="edit">1231</div>
      <div id="vditorId"></div>
    </>
  );
};

export default ArticleEditor;
