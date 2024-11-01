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

const OAUTH_URI = 'https://qwid.qwit.dev/oauth2/authorize?client_id=1a57457f-a1e3-4326-a4ae-996de63ecba4&response_type=code&scope=*&redirect_uri=https://shop.refilc.hu/oauth2-callback/qwid';

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
  {
    path: '/oauth2-callback/qwid',
    element: <div>loading...</div>,
    loader: async ({ request }) => {
      const searchParams = new URL(request.url).searchParams;
      const code = searchParams.get("code");

      const result = await fetch('https://qwid.qwit.dev/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=https://shop.refilc.hu/oauth2-callback/qwid&client_id=1a57457f-a1e3-4326-a4ae-996de63ecba4&client_secret=idguYAMteIe1p6ubYW9pL0gt`
      });

      const json = await result.json();
      // console.log(json);

      localStorage.setItem('access_token', json['access_token']);

      const userResponse = await fetch('https://qwid.qwit.hu/api/me/user-info', {
        headers: {
          'Authorization': `Bearer ${json['access_token']}`
        }
      });

      const userJson = await userResponse.json();
      const user = userJson['data']['user'];

      localStorage.setItem('active_user', JSON.stringify(user));

      return redirect(user['is_admin'] == true ? '/admin/orders' : '/');
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
