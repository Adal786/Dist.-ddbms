import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from './components/auth/auth';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/login';

const Home = React.lazy(() => import('./components/Display/Home'));
const Users = React.lazy(() => import('./components/Display/Users/Users'));
const History = React.lazy(() => import('./components/Display/History/History'));
const Data = React.lazy(() => import('./components/Display/Data'));
const Error404 = React.lazy(() => import('./components/Display/Error404'));

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/login' element={<Login />} />

            <Route path='/' element={<Auth />} >
              <Route path='/' element={<Home />} />
              <Route path='/data' element={<Data />} />
              <Route path='/users' element={<Users />} />
              <Route path='/history' element={<History />} />

              <Route path='*' element={<Error404 />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
