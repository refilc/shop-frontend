import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import MainLayout from './ui/main/layout.tsx'
import CollectionsPage from './ui/main/pages/collections.tsx';
import HomePage from './ui/main/pages/home.tsx';
import AllProductsPage from './ui/main/pages/all_products.tsx';
import ProductPage from './ui/main/pages/product.tsx';

const OAUTH_URI = 'https://qwid.qwit.hu/oauth2/authorize?client_id=refilc_web_store&response_type=code&scope=user.public.read%2Cuser.private.read&redirect_uri=https%3A%2F%2Fshop.refilc.hu%2Fauth%2Fcallback';

const STRIPE_URLS: { [key: string]: string } = {
  "rf-sticker-pack-blue": "https://buy.stripe.com/aEU01d6MN8bYaPeeUU",
  "rf-sticker-pack-blue-25": "https://buy.stripe.com/00g29l2wx3VI4qQ4gh",
  "rf-sticker-pack-blue-50": "https://buy.stripe.com/00g8xJ7QR1NA1eEcMO",
};

const router = createBrowserRouter([
  // main
  {
    path: '/',
    element: <MainLayout><HomePage /></MainLayout>,
  },
  {
    path: '/collections/:name',
    element: <MainLayout><CollectionsPage /></MainLayout>,
    loader: async ({ params }) => {
      return params.name;
    }
  },
  {
    path: '/categories/:name',
    element: <MainLayout><HomePage /></MainLayout>,
    loader: async ({ params }) => {
      return params.name;
    }
  },
  {
    path: '/all-products',
    element: <MainLayout><AllProductsPage /></MainLayout>,
  },
  {
    path: '/product/:id',
    element: <MainLayout><ProductPage /></MainLayout>,
    loader: async ({ params }) => {
      if (params.id) {
        return redirect(STRIPE_URLS[params.id] + '?locale=hu');
      }

      return redirect('/all-products');

      // return params.id;
    }
  },
  {
    path: '/cart',
    element: <MainLayout><HomePage /></MainLayout>,
  },
  // auth
  {
    path: '/auth',
    loader: () => {
      return redirect(OAUTH_URI);
    },
  },
  {
    path: '/auth/login',
    loader: () => {
      return redirect(OAUTH_URI);
    },
  },
  {
    path: '/login',
    loader: () => {
      return redirect(OAUTH_URI);
    },
  },
  // {
  //   path: '/auth/callback',
  //   loader: async ({ params }) => {
  //     const code = params.code;
  //   },
  // },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
