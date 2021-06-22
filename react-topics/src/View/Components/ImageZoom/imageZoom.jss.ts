import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        imageZoom: {
            height: '100vh',
            width: '100%',
            [theme.breakpoints.down('sm')]: {
                paddingBottom: 50,
            },
        },
        buttonContainer: {
            color: theme.palette.text.primary,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: 50,
        },
    }),
);

export default useStyles;
