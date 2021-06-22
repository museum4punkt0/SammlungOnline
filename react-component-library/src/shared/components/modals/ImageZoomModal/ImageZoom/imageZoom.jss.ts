import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageZoom: {
      height: '100vh',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        paddingBottom: 50,
      },
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      color: '#fff',
      paddingBottom: 50,
    },
  }),
);

export default useStyles;
