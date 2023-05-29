import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <MainLayout />
        }
      >
        <Route index element={<HomePage />} />
        <Route index element={<HomePage />} />
      </Route>

      <Route element={<BlankLayout />}>
      <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;