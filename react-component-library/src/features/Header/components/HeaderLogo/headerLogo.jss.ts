import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

interface IHeaderLogoStyleProps {
  color: string;
}

const useStyles = (props: IHeaderLogoStyleProps) => {
  return makeStyles((theme: Theme) => {
    return createStyles({
      logoLink: {
        alignSelf: 'flex-start',
        color: props.color,
        zIndex: 1200,
        '&:focus-visible': {
          outline: `4px solid ${props.color}`,
        },
        display: 'block',
        height: 64,
        [theme.breakpoints.down('xs')]: {
          height: 38,
        },
        [theme.breakpoints.down(375)]: {
          height: 32,
        },
      },
      logo: {
        height: '100%',
      },
    });
  });
};

export default useStyles;
