import { createTheme } from '@material-ui/core/styles';

const fallbackFont = 'Arial';
const palette = {
  primary: {
    main: '#0F0900',
    light: '#c2c2ba',
    dark: '#666',
    contrastText: '#ffffff',
  },

  secondary: {
    main: '#c2c2ba',
    light: '#ffffff',
    dark: '#6f7045',
    contrastText: '#0F0900',
  },

  text: {
    primary: '#22201E',
    secondary: '#0F0900',
    hint: '#f9ff04',
    disabled: '#666666',
  },
};
const CommonTheme = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette,
  typography: {
    fontFamily: `ClanOTNarrow-News, ${fallbackFont}`,

    // H1 Highlight
    h1: {
      fontFamily: `GTWalsheimPro-Black, ${fallbackFont}`,
      fontSize: '2.5rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '3.25rem',
      letterSpacing: '0.0675em',
      color: 'inherit',
    },

    // H2
    h2: {
      fontFamily: `GTWalsheimPro-Black, ${fallbackFont}`,
      fontSize: '2.25rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '2.625rem',
      letterSpacing: '0.0625em',
      color: 'inherit',
    },

    // H3 Button Text
    h3: {
      fontFamily: `GTWalsheimPro-Bold, ${fallbackFont}`,
      fontSize: '1.75rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '2.25rem',
      letterSpacing: '0.065em',
      color: 'inherit',
    },

    // H4
    h4: {
      fontFamily: `GTWalsheimPro-Bold, ${fallbackFont}`,
      fontSize: '1.5rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.75rem',
      letterSpacing: '0.065em',
      color: 'inherit',
    },

    // H5
    h5: {
      fontFamily: `ClanOTNarrow, ${fallbackFont}`,
      fontSize: '1.3125rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '2rem',
      letterSpacing: '0.07875em',
      color: 'inherit',
    },

    h6: {
      fontFamily: `GTWalsheimPro-Bold, ${fallbackFont}`,
      fontSize: '1.125rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.625rem',
      letterSpacing: '0.07875em',
    },

    subtitle1: {
      fontFamily: `GTWalsheimPro-Bold, ${fallbackFont}`,
      fontSize: '1.125rem',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.625rem',
      letterSpacing: '1px',
    },

    // Description
    body1: {
      fontFamily: `ClanOTNarrow, ${fallbackFont}`,
      fontSize: '1.125rem',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.875rem',
      letterSpacing: '0.075em',
      color: 'inherit',
    },

    body2: {
      fontFamily: `ClanOTNarrow, ${fallbackFont}`,
      fontSize: '1.125rem',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.875rem',
      letterSpacing: '0.071875em',
      color: 'inherit',
    },

    caption: {
      fontFamily: `ClanOTNarrow, ${fallbackFont}`,
      fontSize: '1rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.25rem',
      letterSpacing: '0.07875em',
      color: 'inherit',
    },

    overline: {
      fontFamily: `ClanOTNarrow, ${fallbackFont}`,
      fontSize: '1rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.25rem',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'inherit',
    },
  },
  transitions: {
    duration: {
      complex: 750,
    },
  },
});

const globalFocusVisibleOverride = {
  '&:focus-visible': {
    outline: `4px solid`,
  },
};

CommonTheme.overrides = {
  ...CommonTheme.overrides,
  MuiFormControlLabel: {
    root: {
      ...globalFocusVisibleOverride,
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
  MuiButton: {
    root: {
      color: CommonTheme.palette.secondary.contrastText,

      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&:focus-visible': {
        outline: '4px solid',
      },
    },
  },
  MuiSwitch: {
    root: {
      ...globalFocusVisibleOverride,
    },
  },
  MuiSelect: {
    root: {
      '&:hover': {},
    },
  },
  MuiInputBase: {
    root: {
      color: palette.secondary.contrastText,
    },
  },
  MuiCheckbox: {
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&:focus-visible': {
        outline: '4px solid',
      },
    },
  },
  MuiIconButton: {
    root: {
      fontSize: '1rem',
      '&:hover': {
        backgroundColor: 'transparent',

        '& svg': {
          color: palette.secondary.main,
        },
      },
      '&:focus-visible': {
        outline: '4px solid',
      },
    },
  },
  // Link Text
  MuiLink: {
    button: {
      fontFamily: 'ClanOTNarrow-Medium',
      fontSize: '0.875rem',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '2px',
      color: 'inherit',
      '&:hover': {
        backgroundColor: 'transparent',
        '& a svg': {
          color: 'white',
        },
      },
      '&:focus-visible': {
        outline: '4px solid',
      },
    },
    root: {
      fontWeight: 'bold',
      '&:focus-visible': {
        outline: '4px solid',
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
      color: palette.secondary.contrastText,
      '&:hover': {
        textTransform: 'underline',
      },
    },
  },

  MuiAccordionDetails: {
    root: {
      padding: 0,
    },
  },

  MuiPaper: {
    root: {
      ...globalFocusVisibleOverride,
      color: palette.secondary.contrastText,
    },
  },

  MuiDialogTitle: {
    root: {
      backgroundColor: palette.secondary.main,
      color: palette.secondary.contrastText,
    },
  },
  MuiDialogContent: {
    root: {
      backgroundColor: palette.secondary.main,
      color: palette.secondary.contrastText,
    },
  },

  MuiDialogActions: {
    root: {
      backgroundColor: palette.secondary.main,
      color: palette.secondary.contrastText,
    },
  },
};

export default CommonTheme;
