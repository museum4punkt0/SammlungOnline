import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentWrapper: {
            transition: theme.transitions.create(['height'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            maxWidth: '1280px',
            padding: '50px',
            margin: 'auto',
            backgroundColor: theme.palette.secondary.main,
        },
        contentWrapperHide: {
            height: '0px',
        },
        card: {
            margin: 'auto',
            padding: '12px',
            width: '270px',
            borderRadius: 0,
            backgroundColor: theme.palette.secondary.main,
            boxShadow: 'none',
        },
        cardMedia: {
            height: '270px',
            backgroundSize: 'contain',
            cursor: 'pointer',
        },
        cardContent: {
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& *': {
                color: theme.palette.primary.main,
            },
        },
        cardTypo: {
            textAlign: 'center',
        },
        titleGridItem: {
            display: 'grid',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonTitle: {
            '& > span': {
                display: 'block',
            },
        },
        iconButtonTitleTypo: {
            color: theme.palette.primary.main,
        },
        titleArrowButton: {
            transform: 'rotate(90deg)',
            color: theme.palette.secondary.contrastText,
        },
        endArrowButton: {
            transform: 'rotate(-90deg)',
            color: theme.palette.secondary.contrastText,
        },
    }),
);

export default useStyles;
