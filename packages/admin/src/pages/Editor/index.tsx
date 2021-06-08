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
import type { FormRefMethods } from './SettingDrawer';
import SettingDrawer from './SettingDrawer';
import { useCallback } from 'react';
import { useState } from 'react';
import './index.scss';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from './typeDefs';

const Iconfont = createFromIconfontCN({
  scriptUrl: [ICONFONT_URL],
});

export const initialSettingState = {
  excerpt: '',
  isRecommended: false,
  isCommentable: false,
  category: '',
  tags: [],
};

enum ARTICLE_STATUS {
  DRAFT = 'draft',
  RELEASED = 'released',
  HIDDEN = 'hidden',
}

const ArticleEditor: FC = () => {
  const vditorRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<FormRefMethods>(null);
  const vditor = useRef<Vditor>();

  const [title, setTitle] = useState('');

  const [toggleFullScreen] = useFullSreenFn(vditorRef);

  const [createPost, { loading: isCreatingPost }] = useMutation(CREATE_POST);

  const handleSubmit = useCallback(async () => {
    if (drawerRef.current) {
      try {
        const results = await drawerRef.current.validate();
        const content = vditor.current?.getValue();
        const html = vditor.current?.getHTML();
        const params = { ...results, title, content, html, articleStatus: ARTICLE_STATUS.RELEASED };
        await createPost({
          variables: {
            input: params,
          },
        });
      } catch (error) {
        drawerRef.current.setDrawerVisit(true);
      }
    }
  }, [createPost, title]);

  useEffect(() => {
    vditor.current = new Vditor(vditorRef.current!, {
      width: '80%',
      cache: {
        id: 'vditor',
        enable: false,
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
            <Input
              placeholder="请输入文章标题"
              bordered={false}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="editor-page--header__buttons">
            <Space>
              <Button icon={<SaveTwoTone />}>保存草稿</Button>
              <SettingDrawer ref={drawerRef} />
              <Button
                type="primary"
                icon={<Iconfont type="icon-fabu" />}
                loading={isCreatingPost}
                onClick={() => handleSubmit()}
              >
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
