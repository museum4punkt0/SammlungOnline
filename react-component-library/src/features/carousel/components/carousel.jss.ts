import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ICarouselProps } from '../types/carousel.interface';


const useStyles = makeStyles(() => {
  return createStyles({
    sliderContainer: {
      maxWidth: 1280 + 46 + 46,
      margin: '0 auto',
      '&:focus, & :focus': {
        outline: 'none',
      },
      '&:focus-visible, & :focus-visible': {
        outline: (props: ICarouselProps) => `4px solid ${props.color}`,
      },
      '& .slider-slide': {
        display: 'flex !important',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 !important',
      },
      '& .slider-frame': {
        display: 'flex !important',
        justifyContent: 'center',
      },
      '& .slider-list': {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      },
    },
    sliderContent: {
      display: 'flex',
      transition: 'transform cubic-bezier(0.4, 0, 0.2, 1) 750',
      marginLeft: '0',
      marginRight: '0',
      height: '100%',
      padding: 0,
    },
    wrapper: {
      padding: '0 2.9375rem',
    },
    arrowBack: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      justifyContent: 'flex-endx  1',
      transition: 'opacity cubic-bezier(0.4, 0, 1, 1) 225',
    },
    slide: {
      textAlign: 'center',
    },
    arrowForward: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      transition: 'opacity cubic-bezier(0.4, 0, 1, 1) 225',
    },
    main: {
      margin: '0 auto',
    },
    content: { flex: 1, maxWidth: 1280 },
    container: {
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto',
      maxWidth: 1280,
    },
    arrowContainer: {
      background: 'none',
      padding: '9px !important',
      border: 0,
    },
  });
});

export default useStyles;
