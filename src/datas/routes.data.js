import React, { lazy } from "react";

const Home = lazy(() => import("../pages/home-page/home-page.components"))
const Users = lazy(() => import("../pages/users-page/users-page.component"))
const FormPage = lazy(() => import("../pages/form-page/form-page.component"))
const Events = lazy(() => import("../pages/events-page/events-page.component"))
// const Settings = lazy(() => import("../pages/settings-page/settings-page.component"))
const Contact = lazy(() => import("../pages/contact-page/contact-page.component"))
const Login = lazy(() => import("../pages/login-page/login-page.component"))
const EventPage = lazy(() => import('../pages/event-page/event-page.component'))


const SIDEBAR_ROUTES = [
  {
    linkUrl: "/",
    id: "page-home",
    icon: "fas fa-home",
    label: "Home",
    exact: true,
    main: () => <Home />,
    loggedIn: true,
    loggedOut: false,
    sidebar: true,
    homepage: false,
  },
  {
    linkUrl: "/login",
    id: "page-login-ext",
    icon: "fas fa-sign-in-alt",
    label: "Sign In",
    main: () => <Login />,
    loggedIn: false,
    loggedOut: true,
    sidebar: true,
    homepage: false,
  },
  {
    linkUrl: "/users",
    id: "page-users",
    icon: "fas fa-users",
    label: "Membros",
    main: () => <Users />,
    loggedIn: true,
    loggedOut: false,
    sidebar: true,
    homepage: true,
  },
  {
    linkUrl: "/form",
    id: "page-form",
    icon: "fas fa-file-alt",
    label: "Form",
    main: () => <FormPage />,
    loggedIn: true,
    loggedOut: true,
    sidebar: true,
    homepage: true,
  },
  {
    linkUrl: "/events",
    id: "page-events",
    icon: "fas fa-calendar-alt",
    label: "Eventos",
    main: () => <Events />,
    loggedIn: true,
    loggedOut: false,
    sidebar: true,
    homepage: true,
  },
  {
    linkUrl: "/events/:eventId",
    id: "page-event",
    icon: "",
    label: "",
    main: () => <EventPage />,
    loggedIn: true,
    loggedOut: false,
    sidebar: false,
    homepage: false,
  },
  {
    linkUrl: "/contact",
    id: "page-contact-ext",
    icon: "fas fa-at",
    label: "Contato",
    main: () => <Contact />,
    loggedIn: false,
    loggedOut: true,
    sidebar: true,
    homepage: false,
  },
  {
    linkUrl: "/form-part",
    id: "page-form-part",
    icon: "",
    label: "Cadastro Rápido",
    main: () => <FormPage />,
    loggedIn: true,
    loggedOut: false,
    sidebar: false,
    homepage: false,
  },
  {
    linkUrl: "/form-edit",
    id: "page-form-edit",
    icon: "",
    label: "Form Edit",
    main: () => <FormPage edit={true}/>,
    loggedIn: true,
    loggedOut: false,
    sidebar: false,
    homepage: false,
  },
  // {
  //   linkUrl: "/settings",
  //   id: "page-settings",
  //   icon: "fas fa-cog",
  //   label: "Configs",
  //   main: () => <Settings />,
  //   loggedIn: true,
  //   loggedOut: false,
  //   sidebar: true,
  //   homepage: true,
  // },
];

export default SIDEBAR_ROUTES;

