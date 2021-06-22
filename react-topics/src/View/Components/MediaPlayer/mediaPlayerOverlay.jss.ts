import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            backgroundColor: theme.palette.primary.dark,
            backgroundImage:
                'linear-gradient(0deg, rgba(102,102,102,0.2) 0%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 70%, rgba(102,102,102,0.2) 100%)',
        },
        slider: {
            height: '100vh',
        },
        slide: {
            backgroundSize: 'contain',
        },
        progressbar: {
            width: '100vw',
        },
        mediaPlayerControlsWrapper: {
            width: '100vw',
            position: 'absolute',
            bottom: '0',
        },
    }),
);

export default useStyles;
