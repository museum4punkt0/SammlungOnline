import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        accordionWrapper: {
            marginTop: 50,
            borderTop: 'solid 3px',
            borderBottom: 'solid 3px',
            '& p:last-child': {
                marginBottom: 20,
            },
        },
    }),
);

export default useStyles;
