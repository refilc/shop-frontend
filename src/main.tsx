import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import MainLayout from './ui/main/layout.tsx'
import CollectionsPage from './ui/main/pages/collections.tsx';
import HomePage from './ui/main/pages/home.tsx';
import AllProductsPage from './ui/main/pages/all_products.tsx';
import ProductPage from './ui/main/pages/product.tsx';
import CartPage from './ui/main/pages/cart.tsx';

import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import PayLayout from './ui/pay/layout.tsx';
import PaymentMethodPage from './ui/pay/pages/payment_method.tsx';
import ShippingMethodPage from './ui/pay/pages/shipping_method.tsx';
import FoxpostSelectorPage from './ui/pay/pages/foxpost_selector.tsx';
import AdminLayout from './ui/admin/layout.tsx';
import OrdersPage from './ui/admin/pages/orders.tsx';

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
    element: <MainLayout><CartPage /></MainLayout>,
  },
  // pay
  {
    path: '/pay/shipping-method',
    element: <PayLayout><ShippingMethodPage /></PayLayout>,
  },
  {
    path: '/pay/foxpost-selector',
    element: <PayLayout><FoxpostSelectorPage /></PayLayout>,
  },
  {
    path: '/pay/payment-method',
    element: <PayLayout><PaymentMethodPage /></PayLayout>,
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
  // admin
  {
    path: '/admin/orders',
    element: <AdminLayout><OrdersPage /></AdminLayout>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>,
)
