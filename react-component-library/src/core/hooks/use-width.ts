import { useMediaQuery, useTheme } from '@material-ui/core';

export enum EBreakpoints {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

const useWidth = (): EBreakpoints => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down(EBreakpoints.xs));
  const isSm = useMediaQuery(theme.breakpoints.down(EBreakpoints.sm));
  const isMd = useMediaQuery(theme.breakpoints.down(EBreakpoints.md));
  const isLg = useMediaQuery(theme.breakpoints.down(EBreakpoints.lg));

  if (isXs) {
    return EBreakpoints.xs;
  } else if (isSm) {
    return EBreakpoints.sm;
  } else if (isMd) {
    return EBreakpoints.md;
  } else if (isLg) {
    return EBreakpoints.lg;
  }

  return EBreakpoints.xl;
};

export default useWidth;
