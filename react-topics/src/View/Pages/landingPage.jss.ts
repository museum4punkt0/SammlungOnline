import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.primary.main,
        },
        slider: {
            height: '95vh',
            [theme.breakpoints.up('sm')]: {
                height: '80vh',
            },
        },
        slide: {
            height: '100%',
        },
        slideTintCover: {
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.55)',
        },
        slideContentWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: 'auto',
            height: '100%',
            maxWidth: '1280px',
            width: '100%',
        },
        slideContent: {
            padding: '56px',
            // width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '75%',
            },
            [theme.breakpoints.up('lg')]: {
                padding: 0,
                width: '40%',
            },
        },
        slideContentSubtitle: {
            paddingTop: 10,
        },
        collectionModule: {
            // marginTop: 50,
        },
        collectionsModuleWrapper: {
            margin: '50px 0px',
            backgroundColor: theme.palette.secondary.main,
        },
        outboundLinksModule: {
            marginTop: 50,
            maxWidth: 1280,
            margin: 'auto',

            backgroundColor: theme.palette.primary.main,
            transition: theme.transitions.create(['height'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        discoverCollectionCardContent: {
            // backgroundColor: theme.palette.secondary.main,
            '& *': {
                // color: theme.palette.text.hint,
            },
        },
        findTourCardContent: {
            // backgroundColor: theme.palette.secondary.dark,
            '& *': {
                // color: theme.palette.text.hint,
            },
        },
        footerCard: {
            display: 'inline-grid',
            border: 'none',
            borderRadius: 0,
            boxShadow: 'none',
            backgroundColor: 'transparent',
            margin: 'auto',
            padding: '12px',
            width: '270px',
            color: theme.palette.primary.contrastText,
        },
        footerWrapper: {
            backgroundColor: theme.palette.primary.main,
        },
    }),
);

export default useStyles;
