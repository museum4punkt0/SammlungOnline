import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        spacer: {
            paddingBottom: 15,
        },
        txtBold: {
            fontWeight: 'bold',
            color: theme.palette.secondary.contrastText,
        },
        contrastText: {
            color: theme.palette.secondary.dark,
        },
        txtElement: {
            marginTop: 15,
        },
        outboundLinks: {
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
        },
        expandButton: {
            '&:focus-visible': {
                outlineOffset: '1px',
                outline: `4px solid ${theme.palette.primary.main}`,
                boxShadow: '0px 0px'
            },
            '&:hover': {
                textDecoration: 'underline',
                textDecorationThickness: '0.3em',
                textDecorationColor: theme.palette.text.hint
            }
        }
    }),
);

export default useStyles;
