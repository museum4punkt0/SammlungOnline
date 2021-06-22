import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

interface IHeaderLogoStyleProps {
  color: string;
}

const useStyles = (props: IHeaderLogoStyleProps) => {
  return makeStyles((theme: Theme) => {
    return createStyles({
      logoLink: {
        alignSelf: 'flex-start',
        paddingTop: 5,
        color: props.color,
        zIndex: 1200,
        '&:focus-visible': {
          outline: `4px solid ${props.color}`,
        },
      },
      logo: {
        height: 36,
        width: 185,
        [theme.breakpoints.down('sm')]: {
          width: 150,
        },
      },
    });
  });
};

export default useStyles;
