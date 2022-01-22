import { withStyles } from '@material-ui/core/styles';
import {
  ClanOtNarrowBold,
  ClanOtNarrowBook,
  ClanOtNarrowMedium,
  ClanOtNarrowNews,
  GtWalsheimProBlack,
  GtWalsheimProBold,
} from '../../assets/fonts';

const globalStyles = () => ({
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
        fontWeight: 'normal',
        fontDisplay: 'swap',
      },
      {
        fontFamily: 'GTWalsheimPro-Black',
        src: `local('GTWalsheimPro-Black'), url(${GtWalsheimProBlack}) format('woff2')`,
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontDisplay: 'swap',
      },
    ],
    html: {
      minHeight: '100%',
      // backgroundColor: theme.palette.primary.main,
      overflowX: 'hidden',

      // Base font-sizes for rem
      fontSize: 16,
    },
    body: {
      minHeight: '100%',
      fontFamily: 'ClanOTNarrow, Arial',
      fontWeight: 'normal',
      // backgroundColor: theme.palette.primary.main,
    },
    '#root': {
      minHeight: '100%',
    },
    '*': {
      touchAction: 'manipulation',
    },
    '*:focus': {
      outline: 'none',
    },
  },
});

function CustomCssBaseline(): null {
  return null;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default withStyles(globalStyles as any)(CustomCssBaseline);
