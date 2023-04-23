import { Route, Routes } from 'react-router-dom';
import { Login, Todos, Registration } from './pages';

import { Layout } from './components/Layout';
import { RequireAuth } from './hoc/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Registration />}>
          <Route path=":id" element={<Registration />} />
        </Route>
        <Route
          path="todos/:id"
          element={
            <RequireAuth>
              <Todos />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
