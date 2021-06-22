import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        slider: {
            width: '100%',
            height: '95vh',
            [theme.breakpoints.up('sm')]: {
                height: '80vh',
            },
            margin: 0,
        },
        slideContentWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: 'auto',
            height: '100%',
            maxWidth: '80rem',
            width: '100%',

            '&:before': {
                content: 'no-open-quote',
                backgroundColor: theme.palette.primary.main,
                opacity: '0.5',
                position: 'absolute',
                left: 0,
                width: '100%',
                height: '100%',
            },
        },
        slideContent: {
            padding: '56px',
            width: '100%',
            zIndex: 10,
            [theme.breakpoints.up('sm')]: {
                width: '75%',
            },
            [theme.breakpoints.up('lg')]: {
                padding: 0,
                width: '40%',
            },
        },
        slideTitleTypo: {
            color: theme.palette.text.primary,
        },
        footerWrapper: {
            backgroundColor: theme.palette.primary.main,
        },
    }),
);

export default useStyles;
