declare module '*.svg' {
    import * as React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}

declare module "react-native-webview" {
    import { Component } from "react";
    import { ViewProps } from "react-native";
  
    export type WebViewMessageEvent = {
      nativeEvent: {
        data: string;
      };
    };
  
    export interface WebViewProps extends ViewProps {
      source: { uri?: string; html?: string };
      onMessage?: (event: WebViewMessageEvent) => void;
      javaScriptEnabled?: boolean;
      domStorageEnabled?: boolean;
      allowsInlineMediaPlayback?: boolean;
      onError?: (...args: any[]) => void;
      onHttpError?: (...args: any[]) => void;
    }
  
    export class WebView extends Component<WebViewProps> {}
}