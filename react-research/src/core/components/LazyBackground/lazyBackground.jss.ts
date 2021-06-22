import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            margin: 'auto',
            backgroundPosition: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': {
                opacity: 0.5,
            },
        },
    }),
);

export default useStyles;
