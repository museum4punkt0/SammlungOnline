import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            // paddingTop: 45,
            // paddingBottom: 60,
            paddingLeft: 10,
            paddingRight: 10,
        },
        contentWrapper: {
            maxWidth: '80rem',
            margin: 'auto',
        },
        textArea: {
            marginTop: 40,
            padding: '45px 30px 30px 30px',
        },
        textContent: {
            marginTop: 30,
            [theme.breakpoints.up('lg')]: {
                maxWidth: '50%',
            },
        },
        buttonArea: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '8px',
        },
        buttonLink: {
            textTransform: 'uppercase',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            padding: '0px',
            paddingLeft: '2px',
            '&:focus-visible': {
                outline: '4px solid',
                outlineOffset: '0',
            },
            '&:hover': {
                textDecoration: 'underline',
                textDecorationThickness: '0.2em',
            },
        },
        buttonLinkArrow: {
            marginLeft: 10,
        },
    }),
);

export default useStyles;
