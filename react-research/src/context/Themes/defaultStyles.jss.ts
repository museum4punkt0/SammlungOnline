import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useDefaultStyles = makeStyles((theme: Theme) => {
  return createStyles({
    navTxtBig: {
      fontFamily: 'ClanOTNarrow, Arial',
      fontSize: '1.5rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '3px',
      color: theme.palette.text.primary,
    },
    sectionTxtBig: {
      fontFamily: 'ClanOTNarrow, Arial',
      fontSize: '1.5rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '3px',
      color: theme.palette.text.secondary,
    },
    sectionTxtSmall: {
      fontFamily: 'ClanOTNarrow, Arial',
      fontSize: '0.875rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.71',
      letterSpacing: '2px',
      color: theme.palette.text.secondary,
    },
    footerTxtBig: {
      fontFamily: 'ClanOTNarrow-News, Arial',
      fontSize: '1.5rem',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: theme.palette.text.primary,
    },
    footerTxtSmall: {
      fontFamily: 'ClanOTNarrow-News, Arial',
      fontSize: '0.875rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.64',
      letterSpacing: '1px',
      color: theme.palette.text.secondary,
    },
    highlightTxtBig: {
      fontFamily: 'ClanOTNarrow, Arial',
      fontSize: '1rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.5',
      letterSpacing: '1px',
      color: theme.palette.text.hint,
    },
    highlightTxtSmall: {
      fontFamily: 'ClanOTNarrow, Arial',
      fontSize: '0.875rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.57',
      letterSpacing: '1px',
      color: theme.palette.text.hint,
    },
    fullscreen: {
      backgroundColor: 'inherit',
    },
  });
});

export default useDefaultStyles;
