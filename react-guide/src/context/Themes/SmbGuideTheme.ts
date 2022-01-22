import { createTheme } from '@material-ui/core/styles';
const palette = {
  primary: {
    main: '#000000',
    // beige
    light: '#d3d3d3',
    // brownish-grey
    dark: '#666666',
    contrastText: '#ffffff',
  },
  secondary: {
    // beige
    main: '#ffffff',
    // light pink
    light: '#ffc8c8',
    // pink
    dark: '#f25b5b',
    contrastText: '#000000',
  },
  text: {
    primary: '#000000',
    secondary: '#ffffff',
    // highlight-color
    hint: '#f25b5b',
    // brownish-grey
    disabled: '#666666',
  },
};

const SmbTopicsTheme = createTheme({
  palette,
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
      color: '#f25b5b',
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
      textTransform: 'uppercase',
      color: '#f25b5b',
    },

    // H3 Button Text
    h3: {
      fontFamily: 'GTWalsheimPro-Bold, Arial',
      fontSize: '1.6rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: '#F25B5B',
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
      textTransform: 'uppercase',
      color: '#000000',
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
      color: '#ffffff',
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
      textTransform: 'uppercase',
      color: '#f25b5b',
    },

    subtitle1: {
      fontFamily: 'GTWalsheimPro-Bold, Arial',
      fontSize: '1rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      color: '#ffffff',
    },

    // Description
    body1: {
      fontSize: '0.875rem',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.57',
      letterSpacing: '1px',
      color: '#000000',
      // color: '#ffffff',
    },

    body2: {
      fontFamily: 'ClanOTNarrow, Arial',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.57',
      letterSpacing: '1px',
      color: '#ffffff',
    },

    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.57',
      letterSpacing: '1px',
      color: '#ffffff',
    },

    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.57',
      letterSpacing: '1px',
      color: '#000000',
    },
  },
  transitions: {
    duration: {
      complex: 750,
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

SmbTopicsTheme.overrides = {
  ...SmbTopicsTheme.overrides,
  MuiLinearProgress: {
    determinate: {
      backgroundColor: '#666666',
      opacity: 0.6,
    },
    barColorPrimary: {
      backgroundColor: '#f25b5b',
      opacity: 1,
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
      color: '#ffffff',
    },
    root: {
      fontWeight: 'bold',
      '&:focus-visible': {
        outlineOffset: '2px',
        outline: '4px solid',
        boxShadow: '0px 0px',
      },
      '&:hover': {
        textDecoration: 'underline',
        // textDecorationThickness: '0.3em',
      },
    },
    underlineHover: {
      '&:hover': {
        textDecoration: 'underline',
        textDecorationThickness: '0.2em',
      },
    },
  },

  MuiCheckbox: {
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&:focus': {
        '& span': {
          outline: '4px solid',
          boxShadow: '0px 0px',
        },
      },
    },
  },

  MuiButtonBase: {
    root: {
      // '&:hover': {
      //     textDecorationColor: 'black',
      //     textDecoration: 'underline',
      //     textDecorationThickness: '0.2rem',
      // },
      '&:focus-visible': {
        outline: '4px solid black',
        boxShadow: '0px 0px',
      },
    },
  },

  MuiButton: {
    root: {
      '&:hover': {
        textDecoration: 'underline',
        backgroundColor: 'none',
      },
      '&:focus-visible': {
        outline: '4px solid black',
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
        outline: '4px solid black',
        boxShadow: '0px 0px',
      },
    },
  },

  // MuiSvgIcon: {
  //     root: {
  //         '&:hover': {
  //             color: palette.primary.dark
  //         }
  //     }
  // },

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
