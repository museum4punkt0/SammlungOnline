import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const opacity = '95';

const navHeight = 90;

interface INavigationDrawerStyleProps {
  backgroundColor: string;
}

const useStyles = (props: INavigationDrawerStyleProps) => {
  return makeStyles((theme: Theme) => {
    return createStyles({
      navigation: {
        height: navHeight,
        flexShrink: 0,
      },
      drawerPaper: {
        minHeight: '60vh',
        backgroundColor: props.backgroundColor + opacity,
        display: 'flex',
        alignItems: 'center',
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
        height: navHeight,
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
        minHeight: navHeight,
      },
      content: {
        outline: 0,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '100%',
        maxWidth: 1280,
        margin: '1rem',
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    });
  });
};

export { navHeight, useStyles };
