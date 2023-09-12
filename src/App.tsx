import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Main from 'pages/Main';
import NavBar from 'components/NavBar';
import Upload from 'pages/video/Upload';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Channel from 'pages/Channel';
import NotFound from 'pages/NotFound';
import MyInfo from 'pages/MyInfo';
import Overlay from 'components/Overlay';
import Subscription from 'pages/Subscription';
import Broadcast from 'pages/Broadcast';
import Live from 'pages/Live';
import LiveStreaming from 'pages/Live/LiveStreaming';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
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
              <Route path="/myinfo" element={<MyInfo />} />
              <Route path="/broadcast" element={<Broadcast />} />
              <Route path="/live" element={<Live />} />
              <Route path="/live/:id" element={<LiveStreaming />} />
              <Route path="/search/:query" element={<Main />} />
              <Route path="/watch/:id" element={<Main />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/video/upload" element={<Upload />} />
              <Route path="/@/:id/:page?" element={<Channel />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
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
        <Overlay>
          <NavBar>
            <AnimatedSwitch />
          </NavBar>
        </Overlay>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;
