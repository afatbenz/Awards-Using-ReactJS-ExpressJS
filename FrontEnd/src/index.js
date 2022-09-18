import React from 'react';
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './layouts/home';
import Awards from './layouts/award';
import NotFound from './layouts/404';
 
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/awards" element={<Awards />} />
      <Route path="/cards" element={<Awards />} />
      <Route path="/profile" element={<NotFound />} />
      <Route path="/logout" element={<Home />} />
    </Routes>
  </BrowserRouter>
);