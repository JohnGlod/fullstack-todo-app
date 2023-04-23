import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import './index.css';
import { userStore } from './store/store';

export const UserContext = createContext({store: userStore});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <UserContext.Provider value={{store:  userStore}}>
          <App />
        </UserContext.Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
