
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Feed from "views/examples/Feed.js";

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
  },
  {
    path: "/tables",
    name: "Registered Users",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/feed",
    name: "Live Feed",
    icon: "ni ni-camera-compact text-green",
    component: <Feed />,
    layout: "/admin",
  },
 

];
export default routes;
