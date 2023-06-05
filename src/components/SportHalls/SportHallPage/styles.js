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
  toggleButtons: {
    boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.1)',
    '& .MuiToggleButton-root': {
      color: '#43bbbf',
      padding: '15px 20px',
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: '#ededed'
      },
      '&.Mui-selected': {
        backgroundColor: '#43bbbf',
        color: 'white',
        '&:hover': {
          backgroundColor: '#43bbbf',
        }
      }
    },
  },
  headlineWrapper: {
    position: 'absolute',
    top: '10%',
    left: '5%',
    width: '40%',
    fontFamily: 'sans-serif'
  },
  headline: {
    fontFamily: 'sans-serif',
    fontSize: '2.35rem',
    fontWeight: '800',
    marginBottom: '8px',
    color: '#43bbbf'
  },
  subtextHeadline: {
    fontFamily: 'sans-serif',
    fontSize: '1rem',
    color: '#4d4d4d'
  },
  formWrapper: {
    backgroundColor: '#43bbbf',
    display: 'flex',
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
    maxWidth: '25vw'
  },
  reservationFormTemporary: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '25px',
    margin: '20px',
    boxShadow: '0 1px 6px 0 #20212447',
    maxWidth: '50vw'
  },
  reservationFormHeadline: {
    color: '#43bbbf',
    margin: '20px !important',
    textAlign: 'center',
    fontSize: '1.7rem !important',
    fontWeight: 'bold !important',
    fontFamily: 'sans-serif !important'
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
    //marginLeft: 'auto',
    marginRight: 'auto',
    width: 'calc(63vw + 20px)',
    fontFamily: 'sans-serif',
    //height: '100%',
    display: 'flex',
    margin: '20px',
    flexDirection: 'column'
  },
  calendarWeekdays: {
    '& >div': {
      display: 'inline-block',
      verticalAlign: 'top',
      width: 'calc(61vw / 7)',
      height: '40px',
      overflow: 'hidden',
      textAlign: 'center',
      backgroundColor: '#ffffff',
      color: '#43bbbf',
      border: '0.5px solid rgba(25, 118, 210, 0.04)'
    },
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    //float: "left",
    zIndex: '10'
  },
  calendarContent: {
    '& >div': {
      width: 'calc(61vw / 7)',
      height: '24px',
      overflow: 'hidden',
      textAlign: 'center',
      backgroundColor: '#ffffff',
      color: '#787878',
      float: 'left',
      '&:hover': {
        backgroundColor: '#dfdfdf'
      },
      border: '0.5px solid rgba(0, 0, 0, 0.08)',
      borderTop: '0',
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      fontSize: 'small',
      borderRadius: '0.6rem'
    },
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    float: "left",
    zIndex: '10',
    borderRadius: '0px 0px 12px 12px'
  },
  calendarHeader: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    float: "left",
    zIndex: '10',
    opacity: '0.7',
    //height: '37px',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#04777b',
    padding: '18px 0',
    borderRadius: '12px 12px 0px 0px',
    '& >h1': {
      fontSize: '1.5rem',
      color: 'white',
      float: 'left',
      width: '70%'
    }
  },
  calendarWrapper: {
    padding: '10px 10px 10px 10px',
    backgroundColor: 'white',
    borderRadius: '0 0 20px 25px'
  },
  partTime: {
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  forDate: {
    padding: '15px 5px',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      padding: '5px 0px',
    },
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
    marginTop: '5px'
  },
  teamMembersWrapperModal: {
    border: '1px solid #bababa',
    height: '100%',
    marginTop: '5px'
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
    marginTop: '10px'
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
    backgroundColor: '#43bbbf',
    zIndex: '1',
    borderRadius: '99px',
    transition: '0.25s ease-out'
  },
  priceBox: {
    display: 'flex',
    justifyContent: 'end',
    fontSize: '4rem',
    fontWeight: 'bold',
    color: '#43bbbf',
    fontFamily: 'sans-serif',
    marginRight: '1rem'
  }
}))

export default useStyles
