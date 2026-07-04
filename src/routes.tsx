import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';
import AboutPage from './pages/about';
import ProdNotFoundPage from './pages/_404';

const NotFoundPage = import.meta.env.DEV ? lazy(() => import('../dev-tools/src/PageNotFound')) : ProdNotFoundPage;
const AcademicsPage = lazy(() => import('./pages/academics'));
const AdmissionsPage = lazy(() => import('./pages/admissions'));
const ContactPage = lazy(() => import('./pages/contact'));
const GalleryPage = lazy(() => import('./pages/gallery'));
const AdminPage = lazy(() => import('./pages/admin'));

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/academics', element: <AcademicsPage /> },
  { path: '/admissions', element: <AdmissionsPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/gallery', element: <GalleryPage /> },
  { path: '/admin', element: <AdminPage /> },
  { path: '*', element: <NotFoundPage /> },
];

export type Path = '/' | '/about' | '/academics' | '/admissions' | '/contact' | '/gallery' | '/admin';
export type Params = Record<string, string | undefined>;
