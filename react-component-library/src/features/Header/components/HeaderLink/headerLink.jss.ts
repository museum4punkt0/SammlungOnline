import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IHeaderLinkProps } from '../../types/interfaces';

const useStyles = (props: IHeaderLinkProps) =>
  makeStyles((theme: Theme) => {
    return createStyles({
      link: {
        display: 'inline-block',
        padding: '20px 10px 20px 10px',
        textDecoration: 'none !important',
        background: 'transparent',
        '&:focus': {
          outline: '0 !important',
        },
        '&:focus-visible': {
          outline: `4px solid ${props.color}`,
          '& h2, & p': {
            color: props.color,
          },
        },
        '&:hover': {
          '& h2, & p': {
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
