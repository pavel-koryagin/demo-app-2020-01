import React from 'react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: combineReducers({
    form: formReducer,
  }),
});

const defaultWidth = 320;

export default function StorybookSlot({
  width = defaultWidth,
  height = null,
  background = null,
  children,
}) {

  return (
    <Provider store={store}>
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
    </Provider>
  );
}
