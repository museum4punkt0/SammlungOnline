import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            // paddingTop: 45,
            paddingBottom: '6rem',
            // paddingLeft: 10,
            // paddingRight: 10,
        }
    }),
);

export default useStyles;
