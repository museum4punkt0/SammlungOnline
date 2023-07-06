import { Theme, withStyles } from '@material-ui/core/styles';
import {
  ClanOtNarrowBold,
  ClanOtNarrowBook,
  ClanOtNarrowMedium,
  ClanOtNarrowNews,
  GtWalsheimProBlack,
  GtWalsheimProBold,
} from '../assets';

const globalStyles = (theme: Theme) => ({
  '@global': {
    '@font-face': [
      {
        fontFamily: 'ClanOTNarrow',
        src: `local('ClanOTNarrow-Bold'), url(${ClanOtNarrowBold}) format('woff2')`,
        fontWeight: 'bold',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'ClanOTNarrow',
        src: `local('ClanOTNarrow-Medium'), url(${ClanOtNarrowMedium}) format('woff2')`,
        fontWeight: 500,
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'ClanOTNarrow-Book',
        src: `local('ClanOTNarrow-Book'), url(${ClanOtNarrowBook}) format('woff2')`,
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'ClanOTNarrow-News',
        src: `local('ClanOTNarrow-News'), url(${ClanOtNarrowNews}) format('woff2')`,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'GTWalsheimPro-Bold',
        src: `local('GTWalsheimPro-Bold'), url(${GtWalsheimProBold}) format('woff2')`,
        fontStyle: 'normal',
        fontWeight: 700,
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'GTWalsheimPro-Black',
        src: `local('GTWalsheimPro-Black'), url(${GtWalsheimProBlack}) format('woff2')`,
        fontStyle: 'normal',
        fontWeight: 900,
        fontDisplay: 'swap',
      },
    ],
    html: {
      minHeight: '100%',
      backgroundColor: theme.palette.primary.main,
      fontSize: 16,
      '@media (max-width: 500px)': {
        fontSize: 10,
      }
    },
    body: {
      minHeight: '100%',
      fontFamily: 'ClanOTNarrow, Arial',
      fontWeight: 'normal',
      backgroundColor: 'white',
      color: '#0F0900',
    },
    '#root': {
      minHeight: '100%',
    },
    '*': {
      touchAction: 'manipulation',
    },
  },
});

function CustomCssBaseline(): any {
  return globalStyles;
}

export default withStyles(globalStyles as any)(CustomCssBaseline);
