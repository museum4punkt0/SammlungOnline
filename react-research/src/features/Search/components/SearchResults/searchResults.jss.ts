import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        content: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem 10px',
        },
        noResults: {
            textTransform: 'uppercase',
            padding: 12,
        },
        spinnerContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%',
            height: '70vh',
        },
    }),
);

export default useStyles;
