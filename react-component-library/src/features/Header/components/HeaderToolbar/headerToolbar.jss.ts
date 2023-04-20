import { makeStyles, createStyles } from '@material-ui/core/styles';

interface IHeaderToolbarStyleProps {
  color: string;
}

const useStyles = (props: IHeaderToolbarStyleProps) => {
  return makeStyles(() => {
    return createStyles({
      toolbar: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: 0,
        maxWidth: 1280,
        margin: '0 auto',
        '& a': {
          '&:focus-visible': {
            outline: `4px solid ${props.color} !important`,
          },
        },
      },
      languageSwitch: {
        '& li a': {
          '&:focus-visible': {
            outline: `4px solid ${props.color} !important`,
          },
        },
      },
      menuButton: {
        alignItems: 'center',
        padding: 0,
        color: 'inherit',
        '&:focus-visible': {
          outline: `4px solid ${props.color} !important`,
        },
      },

      menuButtonFocus: {
        '&:focus-visible': {
          outline: `4px solid ${props.color} !important`,
        },
      },
      title: {
        marginRight: 10,
        color: props.color,
        textTransform: 'uppercase',

        // [theme.breakpoints.down('xs')]: {
        //   fontSize: '1.35rem',
        // },
      },
      menuIconArrow: {
        color: props.color,
      },
    });
  });
};

export default useStyles;
