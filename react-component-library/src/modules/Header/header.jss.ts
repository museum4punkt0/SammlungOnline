import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { navHeight } from './components/HeaderDrawer/navigationDrawer.jss';

const useStyles = () => {
  return makeStyles((theme: Theme) =>
    createStyles({
      actionsContainer: {
        padding: '0 10px',
      },
      appBar: {
        boxShadow: 'none',
        background: 'transparent',
        height: navHeight,
        zIndex: 1000,
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
      },
      wrapper: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '0 20px',
      },
      buttonArea: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      menuButton: {
        alignItems: 'center',
        padding: 0,
        '&:focus': {
          outline: `4px solid`,
        },
      },
      menuText: {
        marginRight: 10,
        [theme.breakpoints.down('xs')]: {
          fontSize: '1.35rem',
        },
        transition: theme.transitions.create(['opacity'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      menuIconArrow: {
        transform: 'rotate(-90deg)',
        transition: theme.transitions.create(['transform'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      menuIconClose: {
        fontSize: '3rem',
        transition: theme.transitions.create(['transform'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    }),
  );
};

export default useStyles;
