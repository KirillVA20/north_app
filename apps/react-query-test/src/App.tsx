import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import { queryClient } from './lib/queryClient';
import { HomePage } from './pages/HomePage';
import { RoutesListPage } from './pages/RoutesListPage';
import { RouteDetailPage } from './pages/RouteDetailPage';
import { CreateRoutePage } from './pages/CreateRoutePage';
import { SpotsListPage } from './pages/SpotsListPage';
import { SpotDetailPage } from './pages/SpotDetailPage';
import { SpotsSearchPage } from './pages/SpotsSearchPage';
import {
  routesListLoader,
  routeDetailLoader,
  spotsListLoader,
  spotDetailLoader,
} from './loaders/routeLoaders';
import './App.css';

// Layout компонент с навигацией
function RootLayout() {
  return (
    <div className="app">
      <nav className="nav">
        <h1>React Query + Axios + React Router (with Loaders)</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/routes">Routes</Link></li>
          <li><Link to="/routes/create">Create Route</Link></li>
          <li><Link to="/spots">Spots</Link></li>
          <li><Link to="/spots/search">Search Spots</Link></li>
        </ul>
      </nav>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

// Создаем роутер с предзагрузкой данных через loaders
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'routes',
        children: [
          {
            index: true,
            element: <RoutesListPage />,
            loader: routesListLoader, // Предзагрузка списка маршрутов
          },
          {
            path: 'create',
            element: <CreateRoutePage />,
          },
          {
            path: ':id',
            element: <RouteDetailPage />,
            loader: routeDetailLoader, // Предзагрузка деталей маршрута
          },
        ],
      },
      {
        path: 'spots',
        children: [
          {
            index: true,
            element: <SpotsListPage />,
            loader: spotsListLoader, // Предзагрузка списка спотов
          },
          {
            path: 'search',
            element: <SpotsSearchPage />,
          },
          {
            path: ':id',
            element: <SpotDetailPage />,
            loader: spotDetailLoader, // Предзагрузка деталей спота
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      {/* React Query Devtools для дебага */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
