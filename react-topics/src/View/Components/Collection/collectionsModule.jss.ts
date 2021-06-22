import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            transition: theme.transitions.create(['height'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            maxWidth: 1280,
            padding: '2rem',
            margin: 'auto',
            backgroundColor: theme.palette.secondary.main,
            [theme.breakpoints.up('sm')]: {
                // padding: '25px',
            },
            [theme.breakpoints.up('lg')]: {
                padding: '2rem',
            },
        },
        titleGridItem: {
            display: 'grid',
            alignItems: 'center',
            justifyContent: 'center',
        },
        titleArrowButton: {
            transform: 'rotate(-90deg)',
            color: theme.palette.secondary.contrastText,
        },
        buttonTitle: {
            '& > span': {
                display: 'block',
            },
        },
        sortCollectionsButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
        },
        sortCollectionsButtonTypo: {
            color: theme.palette.primary.main,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
        },
        showAllButtonTypo: {
            color: theme.palette.primary.main,
            paddingTop: '1rem',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
        endArrowButton: {
            transform: 'rotate(90deg)',
            color: theme.palette.secondary.contrastText,
        },
    }),
);

export default useStyles;
