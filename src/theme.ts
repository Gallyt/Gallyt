const theme = {
  colors: {
    background: '#efefef',
    background2: 'grey',
    primary: '#353b48',
    secondary: '#487eb0',
  },
  media: {
    lg: '@media screen and (min-width:1024px)',
    md: '@media screen and (max-width:1023px)',
    sm: '@media screen and (max-width:767px)',
    xs: '@media screen and (max-width:375px)',
  },
};

export default theme;
export type Theme = typeof theme;
