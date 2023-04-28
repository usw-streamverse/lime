import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Main from 'pages/Main';
import NavBar from 'components/NavBar';
import Upload from 'pages/video/Upload';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <GlobalStyle />
        <NavBar>
          <AnimatedSwitch />
        </NavBar>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
