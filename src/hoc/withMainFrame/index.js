import Footer from 'src/components/MainFrame/Footer'
import Header from 'src/components/MainFrame/Header'

const withMainFrame = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default withMainFrame
