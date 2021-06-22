import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%',
            maxWidth: 1280,
            margin: '0 auto',
            marginTop: '1.5rem',
            [theme.breakpoints.down('md')]: {
                padding: '0 1rem',
            },
        },
        spinnerContainer: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            textAlign: 'center',
            width: '100%',
            margin: '0 auto',
        },
        moduleContent: {
            maxWidth: 1280,
            margin: '0 auto',
            width: '100%',
            paddingBottom: '2rem',
            minHeight: 240,
            height: '100%',
            position: 'relative',
            textAlign: 'center',
        },
        wrapper: {
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
        },
    }),
);

export default useStyles;
