import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    loadingWrapper: {
        height: '100vh',
        width: '100vw',
        backgroundColor: '#000000',
      },
      wrapper: {
        height: '100%',
        width: '100%',
      },
      loadingSpinner: {
        position: 'relative',
        top: '50vh',
      },
  }),
);

export default useStyles;
