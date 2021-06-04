import type { FC } from 'react';
import { useRef } from 'react';
import { useFullSreenFn } from './useFullScreenFn';
import Logo from '@/assets/images/logo2.svg';
import { Button, Input, Space } from 'antd';
import { useEffect } from 'react';
import Vditor from 'vditor';
import { createFromIconfontCN, SaveTwoTone } from '@ant-design/icons';
import { ICONFONT_URL } from '@/utils/utils';
import { toolbar } from './editorConfig';
import SettingDrawer from './SettingDrawer';
import './index.scss';

const Iconfont = createFromIconfontCN({
  scriptUrl: [ICONFONT_URL],
});

const ArticleEditor: FC = () => {
  const vditorRef = useRef<HTMLDivElement>(null);
  const vditor = useRef<Vditor>();

  const [toggleFullScreen] = useFullSreenFn(vditorRef);

  useEffect(() => {
    vditor.current = new Vditor(vditorRef.current!, {
      width: '80%',
      cache: {
        id: 'vditor',
      },
      counter: {
        enable: true,
      },
      toolbar: [...toolbar(toggleFullScreen)],
    });
  }, [toggleFullScreen]);

  return (
    <div className="editor-page">
      <header className="editor-page--header__wrapper">
        <div className="editor-page--header__body">
          <div className="editor-page--header__logo">
            <img src={Logo} alt="" height={45} style={{ verticalAlign: 'middle' }} />
          </div>
          <div className="editor-page--header__title">
            <Input placeholder="请输入文章标题" bordered={false} />
          </div>
          <div className="editor-page--header__buttons">
            <Space>
              <Button icon={<SaveTwoTone />}>保存草稿</Button>
              <SettingDrawer />
              <Button type="primary" icon={<Iconfont type="icon-fabu" />}>
                发布
              </Button>
            </Space>
          </div>
        </div>
      </header>
      <div id="vditor" ref={vditorRef}></div>
    </div>
  );
};

export default ArticleEditor;
