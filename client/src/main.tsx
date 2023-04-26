import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import './index.css';
import { userStore } from './store/user';

export const UserContext = createContext({ store: userStore });

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <UserContext.Provider value={{ store: userStore }}>
          <App />
        </UserContext.Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
