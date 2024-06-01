import { TonConnectUIProvider } from '@tonconnect/ui-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ConfigProvider locale={enUS}>
      <TonConnectUIProvider manifestUrl="https://665b8842f2305d3223ab4b45--incandescent-croquembouche-9e6207.netlify.app/tonconnect-manifest.json">
        <App />
      </TonConnectUIProvider>
    </ConfigProvider>
  </BrowserRouter>
);
