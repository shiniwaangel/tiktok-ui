import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
    @font-face {
        font-family: 'roboto';
        src: url('./Roboto-Regular.ttf');
      }
      @font-face {
        font-family: 'roboto';
        src: url('./Roboto-Bold.ttf');
        font-weight: bold;
      }
      @font-face {
        font-family: 'roboto';
        src: url('./Roboto-BoldItalic.ttf');
        font-weight: bold;
        font-style: italic;
      }
      @font-face {
        font-family: 'roboto';
        src: url('./Roboto-Italic.ttf');
        font-style: italic;
      }
      @font-face {
        font-family: 'roboto';
        src: url('./Roboto-Light.ttf');
        font-weight: 300;
      }
      @font-face {
        font-family: 'roboto';
        src: url('./Roboto-Medium.ttf');
        font-weight: 500;
      }
      `}
  />
);

export default Fonts;
