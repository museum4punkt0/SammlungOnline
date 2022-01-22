import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    playButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 35,
      maxWidth: '250px',
      width: '100%',
      height: 58,
      margin: '25px 25px 25px 0px',
      cursor: 'pointer',
      backgroundColor: theme.palette.text.hint,
      '&:hover': {
        // TODO add to theme
        backgroundColor: theme.palette.primary.light,
        // filter: 'brightness(150%)',
        boxShadow: '0px 0px',
      },
      '&:focus': {
        outlineOffset: '8px',
        outline: `4px solid ${theme.palette.text.hint}`,
      },
    },
    playButtonTypo: {
      textTransform: 'uppercase',
      lineHeight: 1,
    },
  }),
);

export default useStyles;
