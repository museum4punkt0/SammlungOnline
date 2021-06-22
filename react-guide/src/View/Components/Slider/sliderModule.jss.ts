import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sliderModule: {
            position: 'relative',
            height: '35vh',
            width: '100vw',
            margin: '0 auto',
            overflow: 'hidden',
            transition: theme.transitions.create(['opacity'], {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        arrowBack: {
            display: 'flex',
            position: 'absolute',
            top: '49%',
            transition: theme.transitions.create(['opacity'], {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.enteringScreen,
            }),
            left: theme.spacing(1),
        },
        arrowForward: {
            display: 'flex',
            position: 'absolute',
            top: '49%',
            transition: theme.transitions.create(['opacity'], {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.enteringScreen,
            }),
            right: theme.spacing(1),
        },
    }),
);

export default useStyles;
