import React from "react";
// import image1 from "./book-homepage-image.jpg";
import { useQuery } from "@apollo/client";
import { QUERY_BOOKS } from "../utils/queries";
import LoginPage from "../components/LoginPage/LoginPage";

const Login = () => {
  const { loading, data } = useQuery(QUERY_BOOKS);
  const books = data?.books || [];

  return <LoginPage />;
};

export default Login;

// import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import LoginPage from "../components/LoginPage/LoginPage";

// // const Login = () => <LoginPage />;

// class Login extends Component {
//   render() {
//     return (
//       <Router>
//         <div className="Login">
//           <Route path="/login" component={LoginPage} />
//         </div>
//       </Router>
//     );
//   }
// }

// export default Login;
