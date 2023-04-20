import { createTheme } from '@material-ui/core';

const palette = {
  primary: {
    main: '#0F0900',
    light: '#d8d8d8',
    dark: '#666666',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#79a9f5',
    light: '#ffffff',
    dark: '#6f7045',
    contrastText: '#0F0900',
  },
  text: {
    primary: '#0F0900',
    secondary: '#0F0900',
    hint: '#f9ff04',
    disabled: '#666666',
  },
};

export const textLineHeight = '1.4rem';
const fallbackFont = 'Arial';

const SmbResearchTheme = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette,
  typography: {
    fontFamily: 'ClanOTNarrow-News, Arial',

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
      lineHeight: '1.25rem',
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

SmbResearchTheme.overrides = {
  ...SmbResearchTheme.overrides,

  MuiFormControlLabel: {
    root: {
      ...globalFocusVisibleOverride,
    },
  },
  MuiButtonBase: {
    root: {
      ...globalFocusVisibleOverride,
    },
  },
  MuiButton: {
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
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
  MuiCheckbox: {
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
      ...globalFocusVisibleOverride,
    },
  },
  MuiSwitch: {
    root: {
      ...globalFocusVisibleOverride,
    },
  },
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
        outline: `4px solid`,
      },
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  MuiIconButton: {
    root: {
      fontSize: '1rem',
      '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'underline',
        '& svg': {
          color: SmbResearchTheme.palette.secondary.main,
        },
      },
      ...globalFocusVisibleOverride,
    },
  },
  MuiBackdrop: {
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
  MuiPaper: {
    root: {
      ...globalFocusVisibleOverride,
    },
  },
  MuiAccordionSummary: {
    root: {
      padding: 0,
      '&:hover': {
        textTransform: 'underline',
        backgroundColor: SmbResearchTheme.palette.primary.light,
      },
    },
  },
  MuiAccordionDetails: {
    root: {
      padding: 0,
    },
  },
  MuiDialogTitle: {
    root: {
      backgroundColor: SmbResearchTheme.palette.secondary.main,
      color: SmbResearchTheme.palette.secondary.contrastText,
    },
  },
  MuiDialogContent: {
    root: {
      backgroundColor: SmbResearchTheme.palette.secondary.main,
      color: SmbResearchTheme.palette.secondary.contrastText,
    },
  },
  MuiDialogActions: {
    root: {
      backgroundColor: SmbResearchTheme.palette.secondary.main,
      color: SmbResearchTheme.palette.secondary.contrastText,
    },
  },
};

export default SmbResearchTheme;
