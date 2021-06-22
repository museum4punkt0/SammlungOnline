import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sliderContent: {
            transition: theme.transitions.create(['transform'], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.complex,
            }),
            display: 'flex',
            height: '100%',
        },
    }),
);

export default useStyles;
