import React, { useEffect, useState } from 'react';
import SignInWithGoogle from '../firebase/signInWithGoogle';
import AuthServices from '../services/authservices';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (!mail) {
      const body = { email, password }; // Create the body object for the login request
      try {
        if (!email || !password) {
          return;
        }
        await AuthServices.login(body).then((results) => {
          console.log(results);
          localStorage.setItem('token', results.token);
          localStorage.setItem('user', JSON.stringify(results.user));
          window.location.pathname = '/';
        });
        // Handle successful login (e.g., redirect to dashboard, show success message)
      } catch (error) {
        // Handle login errors (e.g., show error message)
        console.error("Login failed", error);
      }
    } else if (mail, name, password) {
      const body = { name, mail, password };

      await AuthServices.register(body).then((results) => {
        console.log(results.existingUser);
        localStorage.setItem('token', results.token);
        if (results.existingUser) {
          localStorage.setItem('user', JSON.stringify(results.existingUser));
        } else {
          localStorage.setItem('user', JSON.stringify(results.newUser))
        }
        window.location.pathname = '/';
      });
    }
  };

  useEffect(() => {
    // AuthServices.register({ name, mail, password });
  }, [name, mail])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          {!(mail) &&
            <>
              <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </>
          }
          {mail &&
            <h2 className="text-3xl font-extrabold text-gray-900">Choose Your Password</h2>
          }
        </div>
        {!(mail) &&
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </form>
        }

        {mail &&
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            {!(mail) &&
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-500 hover:underline">Forgot your password?</a>
                </div>
              </div>
            }
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSubmit}
              >
                {mail ? <>Proceed</> : <>Sign in</>}
              </button>
            </div>
          </form>
        }

        {!(mail) &&
          <div className="mt-6 flex flex-col items-center">
            <SignInWithGoogle setName={setName} setMail={setMail} />
          </div>
        }
      </div>
    </div>
  );
}

export default LoginScreen;
