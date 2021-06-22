import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            // height: '100%',
            backgroundColor: theme.palette.primary.light,
        },
        slider: {
            height: '95vh',
            [theme.breakpoints.up('sm')]: {
                height: '80vh',
            },
        },
        collectionModule: {
            marginTop: 50,
            // paddingTop: '5rem',
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
            margin: '56px',
            [theme.breakpoints.up('sm')]: {
                width: '75%',
            },
            [theme.breakpoints.up('lg')]: {
                width: '40%',
            },
        },
        slideContentSubtitle: {
            // color: theme.palette.primary.contrastText,
            paddingTop: 10,
        },
        slideTitle: {
            marginBottom: '1rem',
            marginTop: '1rem',
            // color: theme.palette.secondary.main,
        },
    }),
);

export default useStyles;