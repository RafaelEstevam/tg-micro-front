import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from "./App";
import { Provider } from 'react-redux';
import reduxStore from './stores/reduxStore';
import { SnackbarProvider } from 'notistack';

const store = reduxStore;

const Root = () => {
  return (
    <Provider store={store}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {/* <AccessibilityBar /> */}
        <App />
      </SnackbarProvider>
    </Provider>
  )
}

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root
});

export const { bootstrap, mount, unmount } = lifecycles;
