declare module 'react-native-webview' {
    import { Component } from 'react';
    import { ViewProps } from 'react-native';
  
    export interface WebViewProps extends ViewProps {
      originWhitelist?: string[];
      source: { uri?: string; html?: string };
      style?: any;
      scrollEnabled?: boolean;
      onLoad?: () => void;
      onError?: () => void;
    }
  
    export class WebView extends Component<WebViewProps> {}
}  