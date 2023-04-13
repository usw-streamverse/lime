import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Main from 'pages/Main';
import NavBar from 'components/NavBar';
import Upload from 'pages/video/Upload';

const AnimatedSwitch = () => {
  const location = useLocation();
  return (
    <div className="transition-wrap">
      <TransitionGroup component={null}>
        <CSSTransition key={location.pathname} classNames="fade" timeout={200}>
          <div>
            <Routes location={location}>
              <Route path="/" element={<Main />} />
              <Route path="/video/Upload" element={<Upload />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GlobalStyle />
      <NavBar>
        <AnimatedSwitch />
      </NavBar>
    </BrowserRouter>
  )
}

export default App;
