import { extendTheme } from '@chakra-ui/react';
import './GlobalStyles.scss';

function GlobalStyles() {
  const theme = extendTheme({});
  return theme;
}

export default GlobalStyles;
