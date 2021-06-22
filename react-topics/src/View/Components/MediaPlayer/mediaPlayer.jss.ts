import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            backgroundColor: theme.palette.primary.dark,
            backgroundImage:
                'linear-gradient(0deg, rgba(102,102,102,0.2) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(102,102,102,0.2) 100%)',
        },
        childWrapper: {
            display: 'inherit',
            width: 'inherit',
            height: 'inherit',
            justifyContent: 'inherit',
            alignItems: 'inherit',
            flexDirection: 'inherit',
            backgroundColor: 'inherit',
        },
        backButton: {
            position: 'absolute',
            cursor: 'pointer',
            zIndex: 999,
        },
        imageZoomButton: {
            position: 'absolute',
            cursor: 'pointer',
            zIndex: 999,
            right: 0,
        },
        slider: {},
        sliderFullscreen: {
            minHeight: '100vh',
        },
        slide: {
            backgroundSize: 'contain',
            backgroundColor: theme.palette.primary.main,
        },
        slideFullscreen: {
            minHeight: '100vh',
        },
        titleWrapper: {
            position: 'relative',
        },
        titleElements: {
            position: 'absolute',
            bottom: 150,
            right: 15,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            [theme.breakpoints.up('md')]: {
                bottom: 250,
            },
        },
        title: {
            maxWidth: 350,
            marginBottom: 25,
            color: theme.palette.text.hint,
            textAlign: 'right',
            transition: theme.transitions.create(['opacity'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        titleToObject: {
            textTransform: 'uppercase',
        },
        titleHide: {
            opacity: '0',
        },
        progressbar: {
            width: '100vw',
        },
        mediaPlayerControlsWrapper: {
            width: '100vw',
            position: 'relative',
            bottom: '150px',
            transition: theme.transitions.create(['bottom'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        mediaPlayerControlsWrapperHide: {
            bottom: 4,
        },
    }),
);

export default useStyles;
