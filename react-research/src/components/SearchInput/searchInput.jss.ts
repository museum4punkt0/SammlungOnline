import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& *': {
        color: theme.palette.primary.main,
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
    gridContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      flexGrow: 1,
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

    gridIconItem: {
      color: '#ffffff',
    },
    button: {
      height: 56,
      width: 56,
    },
    gridSearchItem: {
      width: '100%',
    },

    popper: {
      color: theme.palette.secondary.dark,
      // backgroundColor: 'black',
      borderRadius: 0,
      borderColor: theme.palette.primary.main,
      borderWidth: 4,
      borderTopWidth: 0,
      // left: '-4px !important',
      borderBottomStyle: 'solid',
    },

    label: {
      height: '100%',
    },

    paper: {
      borderRadius: 0,
      backgroundColor: theme.palette.secondary.main,
      boxShadow: 'none',
      height: '100%',
      margin: '0 !important',
    },

    paperMain: {
      borderRadius: 0,
      backgroundColor: theme.palette.secondary.main,
      boxShadow: 'none',
      height: '100%',
      marginBottom: '0 !important',
    },

    listbox: {
      padding: 0,
    },

    option: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.grey[200],
      fontWeight: 'bold',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      display: 'list-item',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      borderColor: theme.palette.primary.main,
      border: 'solid 2px',
      borderBottom: '0',

      '&:not(:last-child)': {
        borderBottomStyle: 'solid',
        borderColor: theme.palette.primary.main,
        borderBottomWidth: 2,
      },

      '&[data-focus=true]': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
  }),
);

export default useStyles;
