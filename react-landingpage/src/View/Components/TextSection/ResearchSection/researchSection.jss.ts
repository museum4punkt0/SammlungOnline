import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      loaderContainer: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 200,
      }
    }),
);

export default useStyles;
