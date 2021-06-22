import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    slide: {
      height: '95vh',
      [theme.breakpoints.up('sm')]: {
        height: '80vh',
      },
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center 33%',
    },
  }),
);

export default useStyles;
