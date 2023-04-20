import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    input: {
      height: '3.125rem',
      alignItems: 'flex-end',
      padding: '0 0 .25rem 0',
      color: theme.palette.primary.main,
      flexGrow: 1,

      '& .MuiInput-underline:before': {
        borderBottom: ' solid 2px !important',
        borderColor: 'currentColor',
      },
      '& .MuiAutocomplete-inputFocused': {
        fontWeight: '900',
      },
    },

    gridItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'middle',
    },
    clearIcon: {
      color: '#0F0900',
      paddingRight: '0 !important',
      marginLeft: '.5rem !important',
      paddingLeft: '0 !important',
      paddingBottom: '0 !important',
      paddingTop: '0 !important',
    },
  }),
);

export default useStyles;
