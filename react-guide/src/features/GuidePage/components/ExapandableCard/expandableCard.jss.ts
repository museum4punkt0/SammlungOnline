import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mapContainer: {
      backgroundColor: theme.palette.secondary.dark,
    },
    checkbox: {
      color: theme.palette.secondary.dark,

      // '&$checked': {
      //     color: theme.palette.secondary.dark,
      // },
    },
    root: {
      color: theme.palette.primary.main,
      '&$checked': {
        color: theme.palette.secondary.dark,
      },
    },
    checked: {},
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },

    expandMap: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandMapOpen: {
      // transform: 'rotate(180deg)',
    },

    txtBold: {
      fontWeight: 'bold',
      color: theme.palette.secondary.contrastText,
    },
    contrastText: {
      color: theme.palette.secondary.contrastText,
    },
    txtElement: {
      marginTop: 15,
    },

    objectMapImage: {
      height: '23.125rem',
      width: '30rem',
      backgroundPosition: 'top',
    },
    objectPreviewImage: {
      height: '23.125rem',
      backgroundPosition: 'top',
    },
    objectImage: {
      backgroundPosition: 'top',
      height: '22.188rem',
      width: '16.063rem',
      // maxWidth: '100%'
      // width: '100%',
      // width: '18rem',
    },

    list: {
      overflowY: 'auto',
      margin: 0,
      padding: 0,
      listStyle: 'none',
      height: '100%',
      '&::-webkit-scrollbar': {
        width: '0.5em',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.primary.light,
        borderRadius: '2rem',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.secondary.dark,
        borderRadius: '2rem',
        //   outline: '1px solid slategrey'
      },
    },
    iconHover: {
      '&:hover': {
        color: theme.palette.primary.dark,
      },
    },
    buttonHover: {
      '&:hover': {
        '& svg': {
          color: theme.palette.primary.dark,
        },
        textDecoration: 'underline',
        textDecorationThickness: '0.2rem',
      },
    },
  }),
);

export default useStyles;
