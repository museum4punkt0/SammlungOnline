import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            transition: theme.transitions.create(['height'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            backgroundColor: theme.palette.primary.main,
            height: '150px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            color: theme.palette.primary.dark,
            '& *': {
                transition: theme.transitions.create(['opacity'], {
                    easing: theme.transitions.easing.easeInOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
        wrapperHide: {
            height: '0px',
            '& *': {
                opacity: '0',
            },
        },
        maximizeButton: {
            width: '25vw',
        },
        countingArea: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            [theme.breakpoints.down('sm')]: {
                width: '25vw',
                alignItems: 'flex-end',
            },
            [theme.breakpoints.up('md')]: {
                alignItems: 'center',
                position: 'absolute',
                margin: '15px',
                bottom: '150px',
                right: '0',
            },
        },
        hide: {
            display: 'none',
        },
        images: {
            display: 'flex',
            width: '25vw',
            maxWidth: '25vw',
            overflowY: 'hidden',
            overflowX: 'scroll',
            scrollBehavior: 'smooth',
            [theme.breakpoints.down('sm')]: {
                maxWidth: '95vw',
                width: '95vw',
            },
            '&::-webkit-scrollbar': {
                width: 0,
                background: 'transparent',
            },
        },
        imagesSlider: {
            display: 'flex',
            transition: theme.transitions.create(['transform'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            '&:before': {
                pointerEvents: 'none',
                content: 'no-open-quote',
                position: 'absolute',
                zIndex: 999,
                width: '25vw',
                height: '86px',
                background:
                    'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 33%, rgba(0,0,0,0) 67%, rgba(0,0,0,1) 100%)',
                [theme.breakpoints.down('sm')]: {
                    maxWidth: '95vw',
                    width: '95vw',
                },
            },
        },
        image: {
            transition: theme.transitions.create(['border-width'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            height: 86,
            width: 86,
            marginRight: '7px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
        },
        activeImage: {
            border: 'solid 3px '.concat(theme.palette.text.hint),
        },
    }),
);

export default useStyles;
