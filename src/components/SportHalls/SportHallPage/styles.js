import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  leftArrowImage: {
    position: 'absolute',
    top: '35%',
    color: 'whitesmoke',
    height: '3rem !important',
    width: '3rem !important',
    zIndex: '1'
  },
  rightArrowImage: {
    position: 'absolute',
    right: '0',
    top: '35%',
    color: 'whitesmoke',
    height: '3rem !important',
    width: '3rem !important',
    zIndex: '1'
  },
  headlineWrapper: {
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      top: '62vh'
    },
    fontFamily: 'sans-serif'
  },
  headline: {
    fontFamily: 'sans-serif',
    fontSize: '2.35rem',
    fontWeight: '800',
    marginBottom: '8px',
    color: '#43bbbf',
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem'
    },
  },
  subtextHeadline: {
    fontFamily: 'sans-serif',
    fontSize: '1rem',
    color: '#4d4d4d',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem'
    },
  },
  formWrapper: {
    backgroundColor: '#43bbbf',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center !important'
    },
    justifyContent: 'space-evenly',
    paddingTop: '4rem',
    alignItems: 'center'
  },
  reservationForm: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '25px',
    margin: '20px',
    boxShadow: '0 1px 6px 0 #20212447',
    maxWidth: '25vw',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90vw'
    },
  },
  reservationFormTemporary: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '25px',
    margin: '20px',
    boxShadow: '0 1px 6px 0 #20212447',
    maxWidth: '50vw',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '60vw',
      width: '60vw'
    },
  },
  reservationFormHeadline: {
    color: '#43bbbf',
    margin: '20px !important',
    textAlign: 'center',
    fontSize: '1.7rem !important',
    fontWeight: 'bold !important',
    fontFamily: 'sans-serif !important',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem !important'
    },
  },
  customButton: {
    backgroundColor: '#43bbbf !important',
    '&:hover': {
      boxShadow:'0 0 0 0 #43bbbf,inset 6em 3.5em 0 0 #17a6ab !important',
    },
    color: 'white',
    marginTop: '20px'
  },
  calendar: {
    marginRight: 'auto',
    width: 'calc(63vw + 20px)',
    fontFamily: 'sans-serif',
    display: 'flex',
    margin: '20px',
    flexDirection: 'column'
  },
  calendarWeekdays: {
    '& >div': {
      display: 'inline-block',
      verticalAlign: 'top',
      width: '100%',
      height: '30px',
      overflow: 'hidden',
      textAlign: 'center',
      backgroundColor: '#ffffff',
      color: '#43bbbf',
      border: '0.5px solid rgba(25, 118, 210, 0.04)',
      [theme.breakpoints.down('xs')]: {
        fontSize: 'x-small'
      },
    },
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    zIndex: '10'
  },
  calendarHeader: {
    width: '100%',
    float: "left",
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#387d82',
    borderRadius: '12px 12px 0px 0px',
    '& >h1': {
      fontSize: '1.5rem',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1rem'
      },
      color: 'white',
      fontFamily: 'sans-serif'
    }
  },
  calendarWrapper: {
    padding: '10px 10px 10px 10px',
    backgroundColor: 'white',
    borderRadius: '0 0 20px 25px'
  },
  forDate: {
    padding: '15px 5px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    color: 'black',
    fontSize: '1rem',
    border: '0',
    outline: '1px solid #bababa',
    borderRadius: '5px',
    '&:focus': {
      outline: '2px solid #007bff',
      '&:hover': {
        outline: '2px solid #007bff'
      }

    },
    '&:active': {
      outline: '2px solid #007bff'
    },
    '&:hover': {
      outline: '1px solid black'
    }
  },
  forDateError: {
    padding: '15px 5px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: '5px 0px',
    },
    color: 'black',
    fontSize: '1rem',
    border: '0',
    outline: '1px solid #d32f2f',
    borderRadius: '5px',
    '&:focus': {
      outline: '2px solid #d32f2f',
      '&:hover': {
        outline: '2px solid #d32f2f'
      }

    },
    '&:active': {
      outline: '2px solid #d32f2f'
    }
  },
  dateTimeWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '16px',
    marginBottom: '8px'
  },
  inviteButton: {
    width: '100%',
    color: 'white',
    borderRadius: '0',
    backgroundColor: '#43bbbf',
    height: '3rem',
    '&:hover': {
      backgroundColor: '#3eacb0'
    }
  },
  friendsHeadline: {
    width: '100%',
    color: 'white',
    borderRadius: '0',
    backgroundColor: '#43bbbf',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  },
  teamMembersWrapper: {
    border: '1px solid #bababa',
    height: '50%',
    marginTop: '5px',
    overflow: 'auto'
  },
  teamMembersWrapperModal: {
    border: '1px solid #bababa',
    height: '100%',
    marginTop: '5px',
    overflow: 'auto'
  },
  teamMemberPhotoUsername: {
    display: 'flex',
    alignItems: 'center'
  },
  teamMember: {
    padding: '10px',
    border: '1px solid #bababa',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    borderRadius: '25px',
    backgroundColor: 'white',
    width: '65vw',
    height: '50vh'
  },
  searchIconWrapper: {
    padding: '0px 16px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    marginLeft: '8px',
    width: '50%',
  },
  searchField: {
    color: 'inherit',
    padding: '8px 8px 8px 0',
    paddingLeft: 'calc(1em + 32px) !important',
    '&:hover': {
      border: 'none',
    },
    width: '100%',
  },
  modalFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerForTabs: {
  left: '0',
  top: '0',
  right: '0',
  bottom: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
  },
  tabs: {
    display: 'flex',
    position: 'absolute',
    backgroundColor: '#fff',
    boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.1)',
    padding: '0.5rem',
    borderRadius: '99px',
    '& *': {
        zIndex: '2',
    },
    fontFamily: 'sans-serif',
    color: '#43bbbf'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '54px',
    width: '200px',
    [theme.breakpoints.down('sm')]: {
      width: '160px',
      fontSize: '1.1rem'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100px',
      fontSize: '0.7rem',
      height: '40px'
    },
    fontSize: '1.25rem',
    fontWeight: '500',
    borderRadius: '99px',
    cursor: 'pointer',
    transition: 'color 0.15s ease-in',
  },
  glider: {
    position: 'absolute',
    display: 'flex',
    height: '54px',
    width: '200px',
    [theme.breakpoints.down('sm')]: {
      width: '160px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100px',
      height: '40px'
    },
    backgroundColor: '#43bbbf',
    zIndex: '1',
    borderRadius: '99px',
    transition: '0.25s ease-out'
  },
  priceBox: {
    display: 'flex',
    justifyContent: 'end',
    fontSize: '3rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.6rem'
    },
    fontWeight: 'bold',
    color: '#43bbbf',
    fontFamily: 'sans-serif',
    marginRight: '1rem'
  },
  firstPartOfPageWrapper: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      marginBottom: '3rem'
    },
    marginTop: '30px',
    marginBottom: '7rem'
  },
  headlineAndDetailsWrapper: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '50vh'
    },
    height: '60vh',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end'
  },
  mobileStepper: {
    padding: '0 !important',
    justifyContent: 'center',
    position: 'absolute',
    top: '58%',
    left: '75%',
    right: '25%',
    zIndex: '1',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'transparent !important',
      left: '50%'
    },
    backgroundColor: 'transparent',
    '& .MuiMobileStepper-dot': {
      width: 12,
      height: 12,
    },
    '& .MuiMobileStepper-dotActive': {
      backgroundColor: '#43bbbf',
    }
  },
  imageStyle: {
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    height: '60vh'
  },
  flexRowBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  friendsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '90%'
  },
  availableFriendWrapper: {
    width: '45%',
    display: 'flex',
    flexDirection: 'column'
  },
  searchMembersPartModal: {
    width: '45%',
    display: 'flex',
    flexDirection: 'column'
  },
  searchWrapper: {
    height: '3rem',
    color: 'white',
    backgroundColor: '#43bbbf'
  },
  suggestionList: {
    backgroundColor: 'white',
    zIndex: '10'
  },
  dateDisplayWeekdays: {
    color: 'slategrey',
    fontSize: 'small',
    fontWeight: '600',
    [theme.breakpoints.down('xs')]: {
      fontSize: 'smaller'
    },
  },
  scheduler: {
    display: 'flex',
    fontFamily: 'sans-serif',
    marginRight: 'auto',
    padding: '10px',
    paddingTop: '0',
    [theme.breakpoints.down('xs')]: {
      overflow: 'auto'
    },
  },
  timesColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingRight: '8px',
  },
  timeSlot: {
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '4px',
    borderBottom: '1px solid #ccc',
    fontSize: '14px',
    color: '#333',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px'
    },
  },
  schedulerGrid: {
    display: 'flex',
    flexGrow: 1,
  },
  schedulerDayColumn: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #ccc',
    flexGrow: 1,
    position: 'relative',
  },
  dateLabel: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
  },
  appointment: {
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'radial-gradient(ellipse at center, #43bbbf, #1f9ea7)',
    color: '#fff',
    borderRadius: '4px',
    fontSize: 'small',
    [theme.breakpoints.down('md')]: {
      fontSize: '11px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '7px'
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  schedulerWrapper: {
    backgroundColor: 'white',
    margin: '20px',
    borderRadius: '25px',
    width: '55vw',
    [theme.breakpoints.down('sm')]: {
      width: '90vw !important'
    },
  },
  disabledTab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '54px',
    width: '200px',
    fontSize: '1.25rem',
    fontWeight: '500',
    borderRadius: '99px',
    backgroundColor: '#eaeaea',
    color: '#999999',
    transition: 'color 0.15s ease-in',
  },
  tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 11,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Example box shadow
  },
  snackbar: {
    '& .MuiSnackbar-root': {
      position: 'fixed',
      right: '20px',
      left: 'auto',
      bottom: '20px',
      zIndex: '11'
    }
  },
  customSnackbar: {
    '& .MuiAlert-root': {
      backgroundColor: '#28969a !important',
      color: 'white !important'
    },
    '& .MuiAlert-icon': {
      color: 'cyan !important'
    }
  },
  wrapperForImages: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  pendingStatus: {
    backgroundColor: '#fdd077 !important',
    color: '#505050 !important',
    fontFamily: 'sans-serif !important',
  },
  acceptedStatus: {
    backgroundColor: '#5EB9BF !important',
    color: 'white !important',
    fontFamily: 'sans-serif !important',
  }
}))

export default useStyles
