import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home.index";
import Login from "./components/authentication/login/login.index";
import Signup from "./components/authentication/signup/signup.index";
import PrivateRoutes from "./utils/private-routes";
import { useEffect, useState } from "react";
import { verifyUser } from "./services/authentication.services";
import FullPageLoader from "./components/full-page-loader";
import { waitUntil } from "./utils/helpers/functions";

function App() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [userData, setUserData] = useState(null);


  const handleUserVerification = () => {
    return new Promise((resolve, reject) => {
      verifyUser(resolve, reject);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      handleUserVerification()
        .then(async (data) => {
          // Set loader to false
          setUserData(data);
          waitUntil(300).then(() => {
            setIsVerifying(false);
          });
        })
        .catch(() => {
          setIsVerifying(false);
        });
    } else {
      setIsVerifying(false);
    }
  }, []);

  if (isVerifying) {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <FullPageLoader />
      </div>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes userData={userData} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
