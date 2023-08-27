import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Main from 'pages/Main';
import NavBar from 'components/NavBar';
import Upload from 'pages/video/Upload';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Channel from 'pages/Channel';
import NotFound from 'pages/NotFound';
import MyInfo from 'pages/MyInfo';
import { createContext, useContext, useRef } from 'react';
import Overlay from 'components/Overlay';
import Subscription from 'pages/Subscription';

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
    <Routes location={location}>
      <Route path="/" element={<Main />} />
      <Route path="/myinfo" element={<MyInfo />} />
      <Route path="/search/:query" element={<Main />} />      
      <Route path="/watch/:id" element={<Main />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/video/upload" element={<Upload />} />
      <Route path="/@/:id/:page?" element={<Channel />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App = () => {
  const overlayRef = useRef<any>(null);
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
