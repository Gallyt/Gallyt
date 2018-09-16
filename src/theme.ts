const theme = {
  colors: {
    alternate: '#26232d',
    dark: '#353b48',
    light: '#BCD1FF',
    primary: '#8159ac',
    secondary: '#342842',
    white: '#DEDEDE',
  },
  fonts: {
    default: `font-family: 'Montserrat', sans-serif;`,
    display: `font-family: 'Comfortaa', cursive;`,
    import: `
      @import url('https://fonts.googleapis.com/css?family=Comfortaa|Montserrat|Source+Code+Pro');
    `,
    mono: `font-family: 'Source Code Pro', monospace;`,
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
