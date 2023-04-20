import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

// const opacity = '98';

const navHeightMob = 106;
const navHeightTabSmall = 112;
const navHeightTabMid = 128;
const navHeightTabLarge = 170;
const navHeightTabMidLarge = 154;
const navHeight = 128;

interface INavigationDrawerStyleProps {
  backgroundColor: string;
}

const useStyles = (props: INavigationDrawerStyleProps) => {
  return makeStyles((theme: Theme) => {
    return createStyles({
      navigation: {
        height: navHeightMob,
        flexShrink: 0,

        [theme.breakpoints.up(375)]: {
          height: navHeightTabSmall,
        },
        [theme.breakpoints.up(500)]: {
          height: navHeightTabMid,
        },
        [theme.breakpoints.up(600)]: {
          height: navHeightTabMidLarge,
        },
        [theme.breakpoints.up(678)]: {
          height: navHeightTabLarge,
        },
        [theme.breakpoints.up(900)]: {
          height: navHeight,
        },
      },
      drawerPaper: {
        minHeight: '60vh',
        backgroundColor: props.backgroundColor,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        overflowX: 'hidden',

        paddingTop: '1rem',

        [theme.breakpoints.up(500)]: {
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '1.5rem',
        },
        [theme.breakpoints.up(678)]: {
          paddingLeft: '2rem',
          paddingRight: '2rem',
          paddingTop: '2rem',
        },
        [theme.breakpoints.up(1024)]: {
          paddingLeft: '3rem',
          paddingRight: '3rem',
        },
        [theme.breakpoints.up('lg')]: {
          paddingLeft: '4rem',
          paddingRight: '4rem',
        },
        // MUI overrides transition for drawer, so we have take care of transform prop, add background-color and
        // add the needed !important statement.
        transition: theme.transitions
          .create(['background-color', 'transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          })
          .concat(' !important'),
      },
      drawerHeader: {
        display: 'flex',
        // height: navHeightMob,
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
        // minHeight: navHeightMob,
        // [theme.breakpoints.up(900)]: {
        //   height: navHeight,
        //   minHeight: navHeight,
        // },
      },
      content: {
        outline: 0,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '100%',
        maxWidth: 1280,
        // margin: '0.625rem 0 0',
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),

        // [theme.breakpoints.up(375)]: {
        //   margin: '0.8125rem 0 0',
        // },
        // [theme.breakpoints.up(678)]: {
        //   margin: ' 1.3125rem 0 0',
        // },
      },
    });
  });
};

export { navHeight, navHeightMob, useStyles };
