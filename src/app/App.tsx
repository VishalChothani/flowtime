import { BrowserRouter, Routes, Route } from 'react-router';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Home } from '../pages/Home';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Home />
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
