import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/navbar/Navbar";
import Leftbar from "./components/leftbar/Leftbar";

import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ClubProfile from "./pages/clubprofile/ClubProfile";

import Explore from "./pages/explore/Explore";
import MyClubs from "./pages/myclubs/MyClubs";
import MyEvents from "./pages/myevents/MyEvents";

import PostCreator from "./pages/postcreator/PostCreator";
import EventCreator from "./pages/eventcreator/EventCreator";
import ClubCreator from "./pages/clubcreator/ClubCreator";

import CategoryClubs from "./pages/categoryClubs/CategoryClubs";

import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";


function App() {
  const {currentUser} = useContext(AuthContext);
  const queryClient = new QueryClient();
  const Layout = () => {
    return(
      <QueryClientProvider client ={queryClient}>
      <div>
        <Navbar/>
        <div style={{ display:"flex" }}>
          <Leftbar/>
          <div style={{ flex:10 }}>
            <Outlet/>
          </div>
        </div>
      </div>
      </QueryClientProvider>
    );
  };
  
  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login"/>
    }
    return children;
  }

  const router = createBrowserRouter([
    {
      path:"/",
      element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
      ),
      children: [
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/profile/:username",
          element:<Profile/>
        },
        {
          path:"/clubProfile/:clubid",
          element:<ClubProfile/>
        },
        {
          path: "/myClubs",
          element: <MyClubs/>
        },
        {
          path: "/myEvents",
          element: <MyEvents/>
        },
        {
          path: "/explore", 
          element: <Explore/>,
        },
        {
          path:"/createEvent",
          element:<EventCreator/>
        }, 
        {
          path:"/createPost",
          element:<PostCreator/>
        }, 
        {
          path:"/createClub",
          element:<ClubCreator/>
        },
        {
          path:"/categoryClubs",
          element: <CategoryClubs/>
        },
        {
          path:"/clubProfile",
          element:<ClubProfile/>
        }, 
        {
          path:"/profile",
          element:<Profile/>

        }
      ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    }, 
   
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
