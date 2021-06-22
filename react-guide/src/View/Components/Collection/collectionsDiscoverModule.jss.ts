import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            transition: theme.transitions.create(['height'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            maxWidth: '1280px',
            margin: 'auto',
            padding: 16,
            backgroundColor: theme.palette.primary.main,
        },
        titleGridItem: {
            display: 'block',
        },
        titleArrowButton: {
            color: theme.palette.primary.contrastText,
        },
        buttonTitle: {
            '& > span': {
                display: 'block',
            },
        },
        titleButton: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            textAlign: 'left',
        },
        titleButtonTypo: {
            color: theme.palette.primary.contrastText,
            fontSize: '1.25rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
        },
    }),
);

export default useStyles;
