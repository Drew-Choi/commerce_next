import { css } from '@emotion/react';
import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  },
);

const CustomEditor = ({
  editorState,
  readOnly = false,
  onEditorStateChange,
  onSave,
}: {
  editorState: EditorState | undefined;
  readOnly?: boolean;
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>;
  onSave?: () => void;
}) => {
  return (
    <div
      css={css`
        width: 100vw;
        /* background-color: red; */
        padding: 40px;
      `}
    >
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        toolbarClassName="editorToolbar-hidden"
        wrapperClassName="wrapper-class"
        editorClassName="editor-class "
        onEditorStateChange={onEditorStateChange}
        toolbar={{ option: ['inline', 'list', 'textAlign', 'link'] }}
        localization={{ locale: 'ko' }}
      />
      {!readOnly && (
        <button
          css={css`
            position: relative;
            background-color: black;
            color: white;
            padding: 5px 20px;
            border-radius: 50px;
          `}
          onClick={onSave}
        >
          저장
        </button>
      )}
    </div>
  );
};

export default CustomEditor;
