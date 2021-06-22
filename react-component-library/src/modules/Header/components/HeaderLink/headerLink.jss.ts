import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IHeaderLinkProps } from './HeaderLink';

const useStyles = (props: IHeaderLinkProps) =>
  makeStyles((theme: Theme) => {
    return createStyles({
      link: {
        display: 'inline-block',
        padding: '20px 10px 20px 10px',
        textDecoration: 'none !important',
        background: 'transparent',
        '&:focus': {
          outline: `4px solid ${props.color}`,
          '& h1, & h6': {
            color: props.color,
          },
        },
        '&:hover': {
          '& h1, & h6': {
            color: props.color,
          },
        },
      },
      title: {
        color: theme.palette.primary.dark,
        textTransform: 'uppercase',
        textAlign: 'end',
        transition: theme.transitions.create(['color'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      subtitle: {
        color: theme.palette.primary.dark,
        textAlign: 'end',
        transition: theme.transitions.create(['color'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    });
  });

export default useStyles;
