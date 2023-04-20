import { createTheme } from '@material-ui/core/styles';

const SmbTopicsTheme = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette: {
    primary: {
      main: '#0F0900',
      // beige
      light: '#c2c2ba',
      dark: '#666666',
      contrastText: '#ffffff',
    },
    secondary: {
      // beige
      main: '#c2c2ba',
      light: '#ffffff',
      // greyish-brown
      dark: '#6f7045',
      contrastText: '#22201E',
    },
    text: {
      primary: '#ffffff',
      secondary: '#22201E',
      // highlight-color
      hint: '#f9ff04',
      // brownish-grey
      disabled: '#666666',
    },
  },
  typography: {
    fontFamily: 'ClanOTNarrow-News, Arial',

    // H1 Highlight
    h1: {
      fontFamily: 'GTWalsheimPro-Black, Arial',
      fontSize: '3rem',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.18',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      // color: '#f9ff04',
      color: 'inherit',
    },

    // H2
    h2: {
      fontFamily: 'GTWalsheimPro-Black, Arial',
      fontSize: '2.35rem',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.22',
      letterSpacing: '1px',
      //textTransform: 'uppercase',
      // color: '#f9ff04',
      color: 'inherit',
    },

    // H3 Button Text
    h3: {
      fontFamily: 'GTWalsheimPro-Bold, Arial',
      fontSize: '1.8rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '1px',
      //textTransform: 'uppercase',
      // color: '#f9ff04',
      color: 'inherit',
    },

    // H4
    h4: {
      fontFamily: 'ClanOTNarrow, Arial',
      fontSize: '1.125rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.2',
      letterSpacing: '2px',
      //textTransform: 'uppercase',
      // color: '#000000',
      color: 'inherit',
    },

    // H5
    h5: {
      fontFamily: 'ClanOTNarrow, Arial',
      fontSize: '1rem',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.22',
      letterSpacing: '1px',
      // color: '#f9ff04',
      color: 'inherit',
    },

    // H6
    h6: {
      fontFamily: 'GTWalsheimPro-Bold, Arial',
      fontSize: '1rem',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.22',
      letterSpacing: '1px',
      //textTransform: 'uppercase',
      // color: '#f9ff04',
      color: 'inherit',
    },

    subtitle1: {
      fontFamily: 'GTWalsheimPro-Bold, Arial',
      fontSize: '1rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      // color: '#ffffff',
      color: 'inherit',
    },

    // Description
    body1: {
      fontSize: '0.875rem',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.57',
      letterSpacing: '1px',
      // color: '#ffffff',
      color: 'inherit',
    },

    body2: {
      fontFamily: 'ClanOTNarrow, Arial',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.57',
      letterSpacing: '1px',
      // color: '#ffffff',
      color: 'inherit',
    },

    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.57',
      letterSpacing: '1px',
      // color: '#ffffff',
      color: 'inherit',
    },

    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.57',
      letterSpacing: '1px',
      // color: '#ffffff',
      color: 'inherit',
    },
  },
  transitions: {
    duration: {
      complex: 750,
    },
  },
});

SmbTopicsTheme.overrides = {
  ...SmbTopicsTheme.overrides,
  MuiButton: {
    root: {
      '&:focus-visible': {
        outline: '4px solid',
        boxShadow: '0px 0px',
      },
    },
  },
  MuiLinearProgress: {
    determinate: {
      backgroundColor: '#666666',
      opacity: 0.6,
    },
    barColorPrimary: {
      backgroundColor: '#f9ff04',
      opacity: 1,
    },
  },
  MuiCheckbox: {
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&:focus-visible': {
        outline: '4px solid',
        boxShadow: '0px 0px',
      },
    },
  },
  MuiIconButton: {
    root: {
      fontSize: '1rem',
      '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'underline',
      },
      '&:focus-visible': {
        outline: '4px solid',
        boxShadow: '0px 0px',
      },
    },
  },
  // Link Text
  MuiLink: {
    button: {
      fontFamily: 'ClanOTNarrow',
      fontSize: '0.875rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '2px',
      // color: '#ffffff',
      color: 'inherit',
    },
    root: {
      fontWeight: 'bold',
      '&:focus-visible': {
        outline: '4px solid',
        boxShadow: '0px 0px',
      },
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  MuiBackdrop: {
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },

  MuiAccordionSummary: {
    root: {
      padding: 0,
    },
  },

  MuiAccordionDetails: {
    root: {
      padding: 0,
    },
  },

  MuiDialogTitle: {
    root: {
      backgroundColor: SmbTopicsTheme.palette.secondary.main,
      color: SmbTopicsTheme.palette.secondary.contrastText,
    },
  },
  MuiDialogContent: {
    root: {
      backgroundColor: SmbTopicsTheme.palette.secondary.main,
      color: SmbTopicsTheme.palette.secondary.contrastText,
    },
  },
  MuiDialogActions: {
    root: {
      backgroundColor: SmbTopicsTheme.palette.secondary.main,
      color: SmbTopicsTheme.palette.secondary.contrastText,
    },
  },
};

export default SmbTopicsTheme;
