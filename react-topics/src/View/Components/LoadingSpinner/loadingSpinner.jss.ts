import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spinner: {
            textAlign: 'center',
            margin: 'auto',
            width: '48px',

            '& > div': {
                width: '12px',
                height: '12px',
                margin: '2px',
                backgroundColor: theme.palette.primary.dark,
                display: 'inline-block',
            },
        },
        bounce1: {
            animationDelay: '-0.32s',
            animation: '1.4s infinite ease-in-out both',
            animationName: '$bouncedelay',
        },
        bounce2: {
            animationDelay: '-0.16s',
            animation: '1.4s infinite ease-in-out both',
            animationName: '$bouncedelay',
        },
        bounce3: {
            animationDelay: '0s',
            animation: '1.4s infinite ease-in-out both',
            animationName: '$bouncedelay',
        },
        '@keyframes bouncedelay': {
            '0%, 80%, 100%': {
                transform: 'scale(0)',
            },
            '40%': {
                transform: 'scale(1.0)',
            },
        },
    }),
);

export default useStyles;
