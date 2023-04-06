import GlobalStyle from './styles/GlobalStyle';
import Main from 'pages/Main';
import NavBar from 'components/NavBar';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <NavBar Content={<Main />} />
    </>
  )
}

export default App;
