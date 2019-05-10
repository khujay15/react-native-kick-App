import React from 'react';
import { WebView } from 'react-native-webview';

export class authtest extends React.Component {
  onWebViewMessage(event) {
    console.log('Message received from webview');

    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
    } catch (err) {
      console.warn(err);
      return;
    }

    switch (msgData.targetFunc) {
      case 'handleDataReceived':
        this[msgData.targetFunc].apply(this, [msgData]);
        break;
    }
  }

  render() {
    const injectScript = `
  (function () {
    window.onclick = function(e) {
      e.preventDefault();
      window.postMessage(e.target.href);
      e.stopPropagation()
    }
  }());
`;
    return (
      <WebView
        source={{ uri: 'https://api.oboonmobility.com/member/login.google' }}
        style={{ marginTop: 20 }}
        onMessage={e => console.log(e.nativeEvent.data)}
        javaScriptEnabled
        userAgent="Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19"
      />
    );
  }
}
