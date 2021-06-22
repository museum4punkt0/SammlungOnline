import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface IHeaderToolbarStyleProps {
  color: string;
}

const useStyles = (props: IHeaderToolbarStyleProps) => {
  return makeStyles((theme: Theme) => {
    return createStyles({
      toolbar: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: 0,
      },
      menuButton: {
        alignItems: 'center',
        padding: 0,
        color: 'inherit',
        '&:focus': {
          outline: `4px solid ${props.color}`,
        },
      },
      title: {
        marginRight: 10,
        color: props.color,
        textTransform: 'uppercase',
        [theme.breakpoints.down('xs')]: {
          fontSize: '1.35rem',
        },
      },
      menuIconArrow: {
        color: props.color,
        transform: 'rotate(-90deg)',
      },
    });
  });
};

export default useStyles;
