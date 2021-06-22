import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        input: {
            height: '3.125rem',
            alignItems: 'flex-end',
            padding: '0 0 .25rem 0',
            color: theme.palette.text.secondary,
            flexGrow: 1,
            '&.MuiInput-underline:before': {
                borderBottom: ' solid 2px !important',
                borderColor: theme.palette.text.secondary,
            },
            '& .MuiAutocomplete-inputFocused': {
                fontWeight: '900',
            },
        },
        gridItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'middle',
        },
        gridContainer: {
            paddingTop: '1.25rem',
        },
        clearIcon: {},
    }),
);

export default useStyles;
