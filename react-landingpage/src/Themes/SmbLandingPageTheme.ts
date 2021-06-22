import { createMuiTheme } from '@material-ui/core/styles';

const SmbLandingPageTheme = createMuiTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
    },
    palette: {
        primary: {
            main: '#000',
            light: '#c2c2ba',
            dark: '#666',
            contrastText: '#ffffff',
        },
        secondary: {
            // beige
            main: '#c2c2ba',
            light: '#ffffff',
            // greyish-brown
            dark: '#6f7045',
            contrastText: '#000000',
        },
        text: {
            primary: '#ffffff',
            secondary: '#000000',
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
            color: '#f9ff04',
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
            color: '#f9ff04',
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
            textTransform: 'uppercase',
            color: '#f9ff04',
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
            color: '#f9ff04',
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
            color: '#ffffff',
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
            fontFamily: 'ClanOTNarrow, Arial',
            fontSize: '0.75rem',
            fontWeight: 500,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '1.57',
            letterSpacing: '1px',
            color: '#ffffff',
        },
    },
    transitions: {
        duration: {
            complex: 750,
        },
    },
});

SmbLandingPageTheme.overrides = {
    ...SmbLandingPageTheme.overrides,
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
            '&:hover': {
                backgroundColor: 'transparent',
            },
            '&:focus-visible': {
                outline: '4px solid',
            },
        },
    },
    MuiSelect: {
        root: {
            '&:hover': {},
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
                    color: SmbLandingPageTheme.palette.secondary.main,
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
            fontFamily: 'ClanOTNarrow',
            fontSize: '0.875rem',
            fontWeight: 500,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 'normal',
            letterSpacing: '2px',
            color: '#ffffff',
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
        },
    },

    MuiAccordionDetails: {
        root: {
            padding: 0,
        },
    },

    MuiDialogTitle: {
        root: {
            backgroundColor: SmbLandingPageTheme.palette.secondary.main,
            color: SmbLandingPageTheme.palette.secondary.contrastText,
        },
    },
    MuiDialogContent: {
        root: {
            backgroundColor: SmbLandingPageTheme.palette.secondary.main,
            color: SmbLandingPageTheme.palette.secondary.contrastText,
        },
    },
    MuiDialogActions: {
        root: {
            backgroundColor: SmbLandingPageTheme.palette.secondary.main,
            color: SmbLandingPageTheme.palette.secondary.contrastText,
        },
    },
};

export default SmbLandingPageTheme;
