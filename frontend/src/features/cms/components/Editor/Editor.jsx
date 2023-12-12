import React from 'react';
import ReactQuill from 'react-quill';
import EditorToolbar, { modules, formats } from './EditorToolbar';
import 'react-quill/dist/quill.snow.css';
import './styles.css';
export const Editor = (props) => {
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
        placeholder={props.placeholder}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
