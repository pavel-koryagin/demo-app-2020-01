import React from 'react';

const defaultWidth = 320;

export default function StorybookSlot({
  width = defaultWidth,
  height = null,
  background = null,
  children,
}) {

  return (
    <div className="storybook-decorator__item">
      <div
        className="storybook-decorator__body"
        style={{
          width: isNaN(width) ? width : (width + 'px'),
          height: isNaN(height) ? height : (height + 'px'),
          background,
        }}
      >
        {children}
      </div>
    </div>
  );
}
