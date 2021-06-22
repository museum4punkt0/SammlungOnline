import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contrastText: {
            color: theme.palette.text.secondary,
        },
        spacingTop: {
            marginTop: 15,
        },
        accordionElement: {
            borderTop: 'solid 1px',
            borderColor: theme.palette.primary.main,
            boxShadow: 'none',
            '&:first-child': {
                borderRadius: 0,
                borderTop: 0,
            },
            '&:not(:last-child)': {
                borderBottom: 0,
            },
            '&:before': {
                display: 'none',
            },
        },
    }),
);

export default useStyles;
