import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useSearchResultRowStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentWrapper: {
            padding: '0 12px',
            transition: theme.transitions.create(['height'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            backgroundColor: theme.palette.secondary.light,
            [theme.breakpoints.up('sm')]: {
                padding: 0,
            },
        },
        listElement: {
            minHeight: 200,
            padding: '10px 0',
            width: '100%',
            borderBottomWidth: 2,
            borderBottomStyle: 'solid',
            borderBottomColor: theme.palette.primary.main,
            flexWrap: 'wrap',
            '&:last-child': {
                border: 'none',
            },
            '&:focus': {
                outline: `4px solid`,
            },
            '&:hover': {
                filter: 'brightness(120%)',
                '& h3': {
                    textDecoration: 'underline',
                },
            },
            [theme.breakpoints.up('sm')]: {
                justifyContent: 'stretch',
                flexWrap: 'nowrap',
            },
        },
        listElementMediaArea: {
            width: 200,
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                justifyContent: 'center',
            },
        },
        listElementDescriptionArea: {
            color: theme.palette.text.secondary,
            textAlign: 'left',
            textTransform: 'initial',
        },
        cardMedia: {
            minHeight: 200,
            width: 200,
            backgroundSize: 'contain',
            cursor: 'pointer',
        },
        contentTypoTitle: {
            display: 'flex',
            wordBreak: 'break-word',
            fontWeight: 'bold',
            padding: '15px 0',
            cursor: 'pointer',
        },
    }),
);
