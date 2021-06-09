import type { FC } from 'react';
import { useRef } from 'react';
import { useFullSreenFn } from './useFullScreenFn';
import Logo from '@/assets/images/logo2.svg';
import { Button, Input, message, Space } from 'antd';
import { useEffect } from 'react';
import Vditor from 'vditor';
import { createFromIconfontCN, SaveTwoTone } from '@ant-design/icons';
import { extractPostId, ICONFONT_URL } from '@/utils/utils';
import { toolbar } from './editorConfig';
import type { FormRefMethods } from './SettingDrawer';
import SettingDrawer from './SettingDrawer';
import { useCallback } from 'react';
import { useState } from 'react';
import './index.scss';
import { useMutation } from '@apollo/client';
import type { DraftInput, DraftResult, ReleaseInput, ReleaseResult } from './typeDefs';
import { DRAFT as DRAFT_GQL, RELEASE } from './typeDefs';
import moment from 'moment';
import { TIME_FORMAT } from '@/utils/constant';
import type { PostItem } from '../Post/typeDefs';
import { ARTICLE_STATUS } from '../Post/typeDefs';

const Iconfont = createFromIconfontCN({
  scriptUrl: [ICONFONT_URL],
});

const ArticleEditor: FC = () => {
  const vditorRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<FormRefMethods>(null);
  const vditor = useRef<Vditor>();
  const draftTimer = useRef<number>(0);

  const [id, setId] = useState(extractPostId());

  const [title, setTitle] = useState('');

  const [toggleFullScreen] = useFullSreenFn(vditorRef);

  const [updatedTime, setUpdatedTime] = useState<string>('');

  const [release, { loading: isReleasing }] = useMutation<ReleaseResult, ReleaseInput>(RELEASE, {
    onCompleted() {
      message.success('发布成功');
      window.clearInterval(draftTimer.current);
    },
  });

  const [draft, { loading: isSaving }] = useMutation<DraftResult, DraftInput>(DRAFT_GQL, {
    onCompleted(data) {
      const {
        saveDraft: { _id, updatedAt },
      } = data;
      setUpdatedTime(moment(updatedAt).format(TIME_FORMAT));
      if (!id) {
        window.history.replaceState(null, '', `editor/${_id}`);
        setId(_id);
      }
      window.clearInterval(draftTimer.current);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleDraftTimer();
    },
  });

  const generateParams = async (isValidate = true) => {
    const content = vditor.current?.getValue();
    const html = vditor.current?.getHTML();
    const results = isValidate
      ? await drawerRef.current?.formRef?.validateFields()
      : await drawerRef.current?.formRef?.getFieldsValue(true);
    return {
      results,
      content,
      html,
    };
  };

  const handleSubmit = useCallback(async () => {
    if (drawerRef.current) {
      try {
        const { results, content, html } = await generateParams();
        const params: PostItem = {
          ...results,
          title,
          content,
          html,
          articleStatus: ARTICLE_STATUS.RELEASED,
          _id: id,
        };
        await release({
          variables: {
            input: params,
          },
        });
      } catch (error) {
        drawerRef.current.setDrawerVisit(true);
      }
    }
  }, [id, release, title]);

  const handleDraft = useCallback(async () => {
    const { results, content, html } = await generateParams(false);
    const params: Partial<PostItem> = {
      ...results,
      _id: id,
      title,
      content,
      html,
      articleStatus: ARTICLE_STATUS.DRAFT,
    };
    await draft({
      variables: {
        input: params,
      },
    });
  }, [draft, id, title]);

  const handleDraftTimer = useCallback(() => {
    draftTimer.current = window.setInterval(() => {
      handleDraft();
    }, 60000);
  }, [handleDraft]);

  useEffect(() => {
    if (!vditor.current) {
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
        input() {
          handleDraft();
        },
      });
    }

    return () => {
      if (vditor.current) {
        vditor.current?.destroy();
      }
    };
    // 这里只需要初始化一次就行，不需要有依赖
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleDraftTimer();
    return () => {
      window.clearInterval(draftTimer.current);
    };
  }, [handleDraftTimer]);

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
              {updatedTime ? (
                <span className="editor-page--header__draft">于{updatedTime}保存草稿</span>
              ) : null}
              <Button
                icon={<SaveTwoTone />}
                loading={isReleasing || isSaving}
                onClick={() => handleDraft()}
              >
                保存草稿
              </Button>
              <SettingDrawer ref={drawerRef} />
              <Button
                type="primary"
                icon={<Iconfont type="icon-fabu" />}
                loading={isReleasing || isSaving}
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
