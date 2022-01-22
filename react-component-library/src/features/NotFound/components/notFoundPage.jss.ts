import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { navHeight } from '../../Header/components/HeaderDrawer/navigationDrawer.jss';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    container: {
      flex: 1,
      height: '100%',
      width: '100%',
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 10px',
      paddingTop: 100,
      maxHeight: '100%',
      [theme.breakpoints.down('md')]: {
        paddingTop: 50,
      },
    },
    content: {
      marginTop: navHeight,
      maxWidth: 600,
      width: '100%',
      margin: '0 auto',
    },
    toMainPageContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      paddingTop: 20,
    },
    toMainPageLink: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
  });
});

export default useStyles;
