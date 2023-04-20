import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    noResults: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textTransform: 'uppercase',
      padding: 12,
      minHeight: '60vh',
      height: '100%',
    },

    spinnerContainer: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '60vh',
    },

    loadingSpinner: {
      '& #spinner-div': {
        backgroundColor: ' #0f0900 !important',
      },
    },
  }),
);

export default useStyles;
