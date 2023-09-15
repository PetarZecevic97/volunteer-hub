import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import MainThemeProvider from "./components/Providers/MainThemeProvider";
import { CssBaseline, CircularProgress } from "@mui/material";
import Sidebar from "./components/Navbar/Sidebar";
// it could be your App.tsx file or theme file that is included in your tsconfig.json
import { Theme } from "@mui/material/styles";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const AdList = lazy(() => import("./pages/Lists/AdList"));
const VolunteerList = lazy(() => import("./pages/Lists/VolunteerList"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const OrganizationList = lazy(() => import("./pages/Lists/OrganizationList"));
const Organization = lazy(() => import("./pages/Organization"));
const Ad = lazy(() => import("./pages/Ad"));
const Signin = lazy(() => import("./pages/Forms/SigninForm"));
const Signup = lazy(() => import("./pages/Forms/SignupForm"));
const CreateOrganizationForm = lazy(
  () => import("./pages/Forms/CreateForms/CreateOrganizationForm")
);
const CreateVolunteerForm = lazy(
  () => import("./pages/Forms/CreateForms/CreateVolunteerForm")
);
const CreateAdForm = lazy(
  () => import("./pages/Forms/CreateForms/CreateAdForm")
);
const UpdateAdForm = lazy(
  () => import("./pages/Forms/UpdateForms/UpdateAdForm")
);
const Profile = lazy(() => import("./pages/Profile"));
const UpdateProfileForm = lazy(
  () => import("./pages/Forms/UpdateForms/UpdateProfileForm")
);
const DebugPanel = lazy(() => import("./pages/DebugPanel"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <MainThemeProvider>
      <CssBaseline />
      <Router>
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<CircularProgress />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/home"
            element={
              <Suspense fallback={<CircularProgress />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<CircularProgress />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/events"
            element={
              <Suspense fallback={<CircularProgress />}>
                <AdList />
              </Suspense>
            }
          />
          <Route
            path="/volunteers"
            element={
              <Suspense fallback={<CircularProgress />}>
                <VolunteerList />
              </Suspense>
            }
          />
          <Route
            path="/volunteer/:volunteerId"
            element={
              <Suspense fallback={<CircularProgress />}>
                <Volunteer />
              </Suspense>
            }
          />
          <Route
            path="/organizations"
            element={
              <Suspense fallback={<CircularProgress />}>
                <OrganizationList />
              </Suspense>
            }
          />
          <Route
            path="/organization/:organizationId"
            element={
              <Suspense fallback={<CircularProgress />}>
                <Organization />
              </Suspense>
            }
          />
          <Route
            path="/ad/:adId"
            element={
              <Suspense fallback={<CircularProgress />}>
                <Ad />
              </Suspense>
            }
          />
          <Route
            path="/ads"
            element={
              <Suspense fallback={<CircularProgress />}>
                <AdList />
              </Suspense>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Suspense fallback={<CircularProgress />}>
                <Signin />
              </Suspense>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Suspense fallback={<CircularProgress />}>
                <Signup />
              </Suspense>
            }
          />
          <Route
            path="/create-org-form"
            element={
              <Suspense fallback={<CircularProgress />}>
                <CreateOrganizationForm />
              </Suspense>
            }
          />
          <Route
            path="/create-volunteer-form"
            element={
              <Suspense fallback={<CircularProgress />}>
                <CreateVolunteerForm />
              </Suspense>
            }
          />
          <Route
            path="/create-ad-form"
            element={
              <Suspense fallback={<CircularProgress />}>
                <CreateAdForm />
              </Suspense>
            }
          />
          <Route
            path="/update-ad-form/:adId"
            element={
              <Suspense fallback={<CircularProgress />}>
                <UpdateAdForm />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<CircularProgress />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/update-profile"
            element={
              <Suspense fallback={<CircularProgress />}>
                <UpdateProfileForm />
              </Suspense>
            }
          />
          <Route
            path="/debug"
            element={
              <Suspense fallback={<CircularProgress />}>
                <DebugPanel />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<CircularProgress />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </MainThemeProvider>
  );
}

export default App;
