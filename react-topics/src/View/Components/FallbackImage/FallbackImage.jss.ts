import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            color: theme.palette.primary.main,
            border: `2px solid ${theme.palette.primary.main}`,
            height: '100%',
            minHeight: 200,
            maxWidth: 200,
            margin: '0 auto',
            padding: '0 1rem',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        },
        headline: {
            textTransform: 'uppercase',
        },
    }),
);

export default useStyles;
