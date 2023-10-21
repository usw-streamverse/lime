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
import WatchLive from 'pages/WatchLive';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Watch from 'pages/Watch';
import RouteModal from 'components/RouteModal';
import Search from 'pages/Search';

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
    <CSSTransition key={location.state?.modal.key || location.key} classNames="fade" timeout={200}>
      <div>
      <Routes location={location.state?.modal || location}>
        <Route path="/" element={<Main />} />
        <Route path="/myinfo" element={<MyInfo />} />
        <Route path="/broadcast" element={<Broadcast />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/live" element={<Live />} />
        <Route path="/live/:id" element={<WatchLive />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/video/upload" element={<Upload />} />
        <Route path="/@/:id/:page?" element={<Channel />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {
        location.state?.modal && (
        <Routes>
          <Route path="*" element={<></>} />
          <Route path="/watch/:id" element={<RouteModal><Watch /></RouteModal>} />
        </Routes>
        )
      }
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
