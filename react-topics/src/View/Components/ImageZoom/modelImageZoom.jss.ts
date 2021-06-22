import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            display: 'flex',
            height: '100vh',
            width: '100vw',
            justifyContent: 'space-between',
        },
        closeButton: {
            position: 'absolute',
            right: 0,
            top: 25,
        },
    }),
);

export default useStyles;
