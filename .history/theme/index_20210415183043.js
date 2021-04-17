import {DefaultTheme, DarkTheme} from '@react-navigation/native';

const spacing = {
  s: 8,
  m: 16,
  l: 24,
  xl: 40,
};

const textVariants = {
  header: {
    fontFamily: 'Raleway',
    fontSize: 36,
    fontWeight: 'bold',
  },
  body: {
    fontFamily: 'Merriweather',
    fontSize: 16,
  },
};

const breakPoints = {
  smallPhone: 0,
  phone: 321,
  tablet: 768,
};

const palette = {
  mainBlue: '#384F7C',
  mainBlueLow: '#384f7cf2',
  cardGrey: '#F2F2F2',
  compareBlue: '#2869EA',
  favoriteYellow: '#FFB800',
  priceGreen: '#4CAF50',
  red: '#FF0000',
  newBlue: '#6CD7E6',
  saleYellow: '#E3E66C',
  lightslate: '#778899',
  shareGrey: '#B9B9B9',
};

export const MyTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    mainBlue: palette.mainBlue,
    mainBlueLow: palette.mainBlueLow,
    cardGrey: palette.cardGrey,
    compareBlue: palette.compareBlue,
    favoriteYellow: palette.favoriteYellow,
    priceGreen: palette.priceGreen,
    red: palette.red,
    newBlue: palette.newBlue,
    saleYellow: palette.saleYellow,
    lightslate: palette.lightslate,
    shareGrey: palette.shareGrey,
  },
  spacing: {
    ...spacing,
  },
  textVariants: {
    ...textVariants,
  },
  breakPoints: {
    ...breakPoints,
  },
};

export const MyDarkTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: palette.green,
    background: palette.black,
    card: palette.black,
    text: palette.white,
    border: palette.white,
    notification: palette.red,
  },
  spacing: {
    ...spacing,
  },
  textVariants: {
    ...textVariants,
  },
  breakPoints: {
    ...breakPoints,
  },
};
