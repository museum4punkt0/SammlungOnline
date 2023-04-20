import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const searchButtonSize = 56;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchInputContainer: {
      border: 'solid 4px',
    },

    searchInput: {
      width: `calc(100% - ${searchButtonSize}px)`,

      '& input': {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        height: '100%',
        padding: '.875rem 1.5rem .5rem !important',
      },

      '& label': {
        fontFamily: 'GTWalsheimPro-Bold, Arial',
        fontSize: '1rem',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1px',
        color: '#d3d3d3',

        [theme.breakpoints.up(360)]: {
          fontSize: '1.25rem',
        },

        [theme.breakpoints.up(500)]: {
          fontSize: '1.8rem',
        },

        [theme.breakpoints.up('lg')]: {
          paddingLeft: '1.625rem',
        },

        '&[data-shrink=true]': {
          padding: '0 .25rem !important',
        },
      },
      '& .MuiInput-underline:before': {
        borderBottomStyle: 'solid',
        borderBottomWidth: 4,
        borderBottomColor: 'currentColor',
      },
      '& .MuiInput-underline:after': {
        borderBottomWidth: 2,
      },

      '& fieldset legend span': {
        fontSize: '1.5rem',
      },

      '& .MuiInputBase-root': {
        border: 'none',
        borderRadius: '0',
        padding: '0 !important',
      },
      '& .MuiFormControl-root': {
        borderRadius: 0,
        // margin: 1,
      },
      '& .MuiAutocomplete-inputRoot': {
        padding: '0',
        [theme.breakpoints.up('lg')]: {
          paddingLeft: '2.125rem',
        },
      },

      '&  .MuiInputLabel-outlined': {
        transform: 'translate(14px, 18px) scale(1)',

        [theme.breakpoints.up(360)]: {
          transform: 'translate(14px, 16px) scale(1)',
        },

        [theme.breakpoints.up(500)]: {
          transform: 'translate(14px, 14px) scale(1)',
        },
      },

      '&  .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        color: '#0F0900',
        transform: 'translate(14px, -9px) scale(0.8)',
        background: '#ffffff',
        paddingLeft: 0,
        [theme.breakpoints.up(360)]: {
          transform: 'translate(14px, -11px) scale(0.8)',
        },

        [theme.breakpoints.up(500)]: {
          transform: 'translate(14px, -14px) scale(0.7)',
        },
      },

      '&  fieldset': {
        // border: 'solid 4px #000000 !important',
        border: 'none',
        borderRadius: 0,
        top: '0 !important',
        // height: '3.75rem',
      },
      '&  fieldset:hover': {
        borderRadius: 0,
      },
    },

    searchIconContainer: {
      '& .MuiButtonBase-root': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 0,
        borderLeft: '4px solid',
      },
      '& path ': {
        color: '#ffffff',
      },
    },
    button: {
      height: searchButtonSize,
      width: searchButtonSize,
    },
    searchIcon: {
      color: '#ffffff',
    },

    advancedSearchContainer: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      userSelect: 'none',
      borderBottomColor: theme.palette.primary.main,
      borderBottomWidth: 4,
      borderBottomStyle: 'solid',
      flexFlow: 'row wrap',
      borderBottom: 'solid 4px ',
      paddingTop: '1.25rem',
    },
    gridContainer: {
      flexGrow: 1,
      padding: 0,
      lineHeight: 0,
      '&:focus': {
        outline: `4px solid ${theme.palette.secondary.main}`,
      },
    },
    moreSearchContainer: {
      borderBottomColor: theme.palette.primary.main,
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',

      '&.MuiSvgIcon-root': {
        marginLeft: -5,
        marginRight: 5,
      },
    },
    addIcon: { marginLeft: -5, marginRight: 5, fill: '#000' },
    expandIcon: {
      width: 55,
      height: 55,
      marginLeft: '-12px',
      fill: '#000',
      transition: theme.transitions.create(['transform'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    expandIconExpandedState: {
      transform: 'rotate(180deg)',
    },
    addAttributeContainer: {
      display: 'flex',
      alignItems: 'center',
      height: '3.75rem',
      cursor: 'pointer',
      width: '100%',
      padding: '6px 0',
      '&:focus': {
        outline: `4px solid ${theme.palette.secondary.main}`,
      },
    },
    alignMiddle: {},
    clearButton: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.light,
      width: '3.75rem',
      height: '3.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 0,
      marginLeft: '0.875rem',
    },
    clearContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      color: 'white',
    },
  }),
);

export default useStyles;
