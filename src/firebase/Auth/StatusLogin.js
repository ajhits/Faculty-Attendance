import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Configuration";
import { getUserData } from "../../firebase/Database";

function useAuth() {
  const [user, setUser] = React.useState();
  const [data, setData] = React.useState();
  const [position, setPosition] = React.useState();
  const [userDetails, setUserDetails] = React.useState({
    "name" : "",
    "idNumber": "",
    "email": "",
    "position": ""
  });

  // const getUserDetails = async (uid) =>{
  //   const data = await getUserData(uid);
  //   setUserDetails(data)
  //   setPosition(data.position)
  // }

  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser("panel");
        setData(user);

        getUserData(user.uid).then(
          data=>{
            setUserDetails(data)
            setPosition(data.position)
          }
        )
      } else {
        // User is signed out
        setUser("login");
        setData(null);
        setUserDetails({
          "name" : "",
          "idNumber": "",
          "email": "",
          "position": ""
        });
      }
    });

    return unsubscribeFromAuthStateChanged;
  }, []);

  return {
    user,
    data,
    userDetails,
    position
  };
}

export default useAuth