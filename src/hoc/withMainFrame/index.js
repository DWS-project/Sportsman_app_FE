import Footer from 'src/components/MainFrame/Footer'
import Header from 'src/components/MainFrame/Header'

const withMainFrame = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default withMainFrame
