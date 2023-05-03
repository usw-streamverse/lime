import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter, Routes, Route, useLocation, useMatches } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Main from 'pages/Main';
import NavBar from 'components/NavBar';
import Upload from 'pages/video/Upload';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Channel from 'pages/Channel';
import NotFound from 'pages/NotFound';

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
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="fade" timeout={200}><div>
            <Routes location={location}>
              <Route path="/" element={<Main />} />
              <Route path="/video/upload" element={<Upload />} />
              <Route id="asd" path="/@/:id/:page?" element={<Channel />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
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
