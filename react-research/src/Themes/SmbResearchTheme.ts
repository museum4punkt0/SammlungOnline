import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
    primary: {
        main: '#000000',
        light: '#d8d8d8',
        dark: '#666666',
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#79a9f5',
        light: '#ffffff',
        dark: '#6f7045',
        contrastText: '#000000',
    },
    text: {
        primary: '#000000',
        secondary: '#000000',
        hint: '#f9ff04',
        disabled: '#666666',
    },
};

const textLineHeight = '1.4rem';

const SmbResearchTheme = createMuiTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
    },
    palette,
    typography: {
        fontFamily: 'ClanOTNarrow-News, Arial',
        h1: {
            fontFamily: 'GTWalsheimPro-Black, Arial',
            fontSize: '3rem',
            fontWeight: 'normal',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: '1px',
            color: palette.text.primary,
        },
        h2: {
            fontFamily: 'GTWalsheimPro-Black, Arial',
            fontSize: '2.35rem',
            fontWeight: 'normal',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: '1px',
            color: palette.text.primary,
        },
        h3: {
            fontFamily: 'GTWalsheimPro-Bold, Arial',
            fontSize: '1.8rem',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: '1px',
            color: palette.text.primary,
        },
        h4: {
            fontFamily: 'ClanOTNarrow, Arial',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: '2px',
            color: palette.text.primary,
        },
        h5: {
            fontFamily: 'ClanOTNarrow, Arial',
            fontSize: '1rem',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: '1px',
            color: palette.text.primary,
        },
        h6: {
            fontFamily: 'GTWalsheimPro-Bold, Arial',
            fontSize: '1rem',
            fontWeight: 'normal',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: '1px',
            color: palette.text.primary,
        },
        subtitle1: {
            fontFamily: 'GTWalsheimPro-Bold, Arial',
            fontSize: '1rem',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: textLineHeight,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: palette.text.primary,
        },
        body1: {
            fontSize: '0.875rem',
            fontWeight: 'normal',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: textLineHeight,
            letterSpacing: '1px',
            color: palette.text.primary,
        },
        body2: {
            fontFamily: 'ClanOTNarrow, Arial',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: textLineHeight,
            letterSpacing: '1px',
            color: palette.text.primary,
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 500,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: textLineHeight,
            letterSpacing: '1px',
            color: palette.text.primary,
        },
        overline: {
            fontSize: '0.75rem',
            fontWeight: 500,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: textLineHeight,
            letterSpacing: '1px',
            color: palette.text.primary,
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
        outline: `4px solid ${palette.secondary.main}`,
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
                    color: '#c2c2ba',
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
