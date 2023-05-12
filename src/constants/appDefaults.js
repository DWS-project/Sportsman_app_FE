const StepperStepsForOwner = ['Postavke profila', 'Tip terena i lokacija']

const StepperStepsForUser = ['Postavke profila', 'Interesovanja']

const cities = ['Sarajevo', 'Zenica', 'Tuzla', 'Mostar']

const StepperActiveColor = '#43bbbf';

const StepperCompletedColor = '#39CCC5';

const imagesDataForOwner = [
  {
    img: '/images/smallSoccerField.jpg',
    title: 'Vanjski',
    name: 'vanjski'
  },
  {
    img: '/images/sportHall.jpg',
    title: 'Unutrašnji',
    name: 'unustrasnji'
  },
  {
    img: '/images/combination.png',
    title: 'Oba tipa',
    name: 'obaTipa'
  },
]

const imagesDataForUser = [
  {
    img: '/images/football.jpg',
    title: 'Fudbal',
    name: 'fudbal'
  },
  {
    img: '/images/basketball.jpg',
    title: 'Košarka',
    name: 'kosarka'
  },
  {
    img: '/images/handball.jpg',
    title: 'Rukomet',
    name: 'rukomet'
  },
  {
    img: '/images/volleyball.jpg',
    title: 'Odbojka',
    name: 'odbojka'
  },
  {
    img: '/images/tennis.jpg',
    title: 'Tenis',
    name: 'tenis'
  },
  {
    img: '/images/paintball.png',
    title: 'Paintball',
    name: 'paintball'
  },
]

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL

export {
  StepperStepsForUser,
  StepperStepsForOwner,
  StepperActiveColor,
  StepperCompletedColor,
  cities,
  imagesDataForOwner,
  imagesDataForUser,
  FRONTEND_URL
}