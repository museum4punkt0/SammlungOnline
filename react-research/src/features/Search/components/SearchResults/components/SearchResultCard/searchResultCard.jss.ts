import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useSearchResultCardStyles = makeStyles((theme: Theme) => {
    const cardHeight = 370;

    return createStyles({
        card: {
            cursor: 'pointer',
            margin: '0.5rem',
            borderRadius: 0,
            backgroundColor: theme.palette.secondary.light,
            boxShadow: 'none',
            textAlign: 'center',
            maxWidth: 320,
            height: cardHeight,
            '&:hover': {
                filter: 'brightness(120%)',
                '& div:last-child': {
                    textDecoration: 'underline',
                },
            },
        },
        content: {
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& *': {
                color: theme.palette.primary.dark,
            },
            marginTop: '1rem',
        },
        typography: {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            height: 45,
            maxWidth: '300px',
            padding: 0,
            textAlign: 'center',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: theme.palette.primary.main,
            overflow: 'hidden',
        },
    });
});
