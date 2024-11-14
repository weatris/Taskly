import classNames from 'classnames';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = ({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) => {
  const handleChange = (content: string) => {
    onChange(content);
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleChange}
      className={classNames('w-full h-full', className)}
      modules={{
        toolbar: [
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          ['clean'],
        ],
      }}
      formats={[
        'list',
        'bold',
        'italic',
        'underline',
        'strike',
        'color',
        'background',
      ]}
    />
  );
};

export default RichTextEditor;
