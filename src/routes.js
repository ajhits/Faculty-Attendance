
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Login from "views/examples/Login.js";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Tables",
    icon: "ni ni-shop text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Users",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  }

  ,
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  }

];
export default routes;
