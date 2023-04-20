import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ICarouselProps } from '../types/carousel.interface';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    sliderContainer: {
      position: 'relative',
      maxWidth: 'calc(100% - 24px)',
      margin: '0 auto',

      [theme.breakpoints.up(678)]: {
        maxWidth: '1280px',
      },

      '&:focus, & :focus': {
        outline: 'none',
      },

      '&:focus-visible, & :focus-visible': {
        outline: (props: ICarouselProps) => `4px solid ${props.color}`,
      },

      '& .slider-slide': {
        display: 'flex !important',
        alignItems: 'center',
        margin: '0 !important',
        cursor: 'unset !important',
      },

      '& .slider-frame': {
        width: '100% !important',
        display: 'flex !important',
        margin: '0 !important',
        cursor: 'unset !important',
      },

      '& .slider-list': {
        display: 'flex',
        position: 'relative',
        width: '100% !important',
        cursor: 'unset !important',
      },

      '& .slider-control-centerleft': {
        left: '-1.75rem !important',
      },

      '& .slider-control-centerright': {
        right: '-1.75rem !important',
      },

      '& .slider-control-centerright, & .slider-control-centerleft': {
        transform: 'translateY(0) !important',
        top: 'calc(50% - 0.75rem) !important',
        width: '1.5rem !important',
        height: '1.5rem !important',
      },
    },

    // sliderContent: {
    //   display: 'flex',
    //   transition: 'transform cubic-bezier(0.4, 0, 0.2, 1) 750',
    //   marginLeft: '0',
    //   marginRight: '0',
    //   height: '100%',
    //   padding: 0,
    // },

    // wrapper: {
    //   padding: '0 2.9375rem',
    // },

    // arrowBack: {
    //   position: 'absolute',
    //   display: 'flex',
    //   alignItems: 'center',
    //   height: '100%',
    //   transition: 'opacity cubic-bezier(0.4, 0, 1, 1) 225',
    //   padding: '0px !important',
    // },

    // slide: {
    //   textAlign: 'center',
    // },

    // arrowForward: {
    //   display: 'flex',
    //   border: 'solid gold',
    //   alignItems: 'center',
    //   height: '100%',
    //   justifyContent: 'center',
    //   transition: 'opacity cubic-bezier(0.4, 0, 1, 1) 225',
    // },

    // main: {
    //   margin: '0 auto',
    // },

    // content: { flex: 1, maxWidth: 1280 },

    // container: {
    //   display: 'flex',
    //   justifyContent: 'center',
    //   margin: '0 auto',
    //   maxWidth: 1280,
    // },

    arrowContainer: {
      position: 'absolute',
      background: 'none',
      padding: '0px !important',
      border: 0,
    },
  });
});

export default useStyles;
