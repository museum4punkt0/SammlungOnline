import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchInput: {
      '& *': {
        color: theme.palette.text.secondary,
      },
      '& input': {
        fontSize: '2rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      '& label': {
        fontFamily: 'GTWalsheimPro-Bold, Arial',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        [theme.breakpoints.up('lg')]: {
          paddingLeft: '1.625rem',
        },
      },
      '& .MuiInput-underline:before': {
        borderBottomStyle: 'solid',
        borderBottomWidth: 4,
        borderBottomColor: theme.palette.primary.main,
      },
      '& .MuiInput-underline:after': {
        borderBottomWidth: 2,
      },
      '& fieldset legend span': {
        fontSize: '1.5rem',
      },

      '& .MuiInputBase-root': {
        border: 'none',
      },
      '& .MuiFormControl-root': {
        borderRadius: 0,
        margin: 1,
      },
      '& .MuiAutocomplete-inputRoot': {
        padding: '2px 4px',
        [theme.breakpoints.up('lg')]: {
          paddingLeft: '2.125rem',
        },
      },
      '&  .MuiInputLabel-outlined': {
        transform: 'translate(14px, 13px) scale(1)',
      },
      '&  .MuiInputLabel-outlined.MuiInputLabel-shrink': {
        transform: 'translate(14px, -14px) scale(0.74)',
        background: '#ffffff',
        paddingLeft: 0,
      },
      '&  fieldset': {
        border: 'solid 4px #000000 !important',
        borderRadius: 0,
        height: '3.75rem',
      },
      '&  fieldset:hover': {
        borderRadius: 0,
      },
    },

    searchIconContainer: {
      '& .MuiButtonBase-root': {
        backgroundColor: theme.palette.primary.main,
        borderRadius: 0,
      },
      '& path ': {
        color: '#ffffff',
      },
    },
    button: {
      height: 56,
      width: 56,
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
      justifyContent: 'flex-start',
      height: '3.75rem',
      cursor: 'pointer',
      width: '100%',
      padding: '6px 0',
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
