import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import {
//   navHeight,
//   navHeightMob,
// } from './components/HeaderDrawer/navigationDrawer.jss';

const useStyles = () => {
  return makeStyles((theme: Theme) =>
    createStyles({
      appBar: {
        boxShadow: 'none',
        background: 'transparent',
        // height: navHeight,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
      },

      appBarWithLang: {
        // height: navHeightMob,
        // [theme.breakpoints.up(900)]: {
        //   height: navHeight,
        // },
      },

      appBarBlack: {
        background: '#0F0900 !important',
      },
      toolbar: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
      },
      drawerHeader: {
        marginBottom: '.5rem',
        // height: '64px',
        display: 'flex',
        alignItems: 'center',
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
        '&:focus-visible': {
          outline: `4px solid`,
          color: 'inhert',
        },
      },
      menuText: {
        marginRight: 10,
        // [theme.breakpoints.down('xs')]: {
        //   fontSize: '1.35rem',
        // },
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
      sectionWrapper: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        [theme.breakpoints.up(500)]: {
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        },
        [theme.breakpoints.up(678)]: {
          paddingLeft: '2rem',
          paddingRight: '2rem',
        },
        [theme.breakpoints.up(1024)]: {
          paddingLeft: '3rem',
          paddingRight: '3rem',
        },
        [theme.breakpoints.up('lg')]: {
          paddingLeft: '4rem',
          paddingRight: '4rem',
        },
      },
    }),
  );
};

export default useStyles;
