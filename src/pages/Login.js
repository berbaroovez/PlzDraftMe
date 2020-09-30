import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle, signInWithGitHub } from "../helpers/auth";


export default function Login(){
  const [error,setError] = useState(null)
  const [email,setEmail]= useState()
  const [password,setPassword]= useState()

  const handleChange = (event)=>{
    event.target.name==='email'?setEmail(event.target.value):setPassword(event.target.value)
}

const handleSubmit=async event=> {
  event.preventDefault();
  setError('')
  try {
    await signin(email, password);
  } catch (error) {
    setError(error.message);
  }
}


return (
  <div className="container">
    <form
      className="mt-5 py-5 px-5"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h1>
        Login to
        <Link className="title ml-2" to="/">
          Chatty
        </Link>
      </h1>
      <p className="lead">
        Fill in the form below to login to your account.
      </p>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
          value={email}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={password}
          type="password"
        />
      </div>
      <div className="form-group">
        {error ? (
          <p className="text-danger">{error}</p>
        ) : null}
        <button className="btn btn-primary px-5" type="submit">Login</button>
      </div>
      
      <hr />
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </form>

  </div>
);
} //end of function
// export default class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       error: null,
//       email: "",
//       password: ""
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.googleSignIn = this.googleSignIn.bind(this);
//     this.githubSignIn = this.githubSignIn.bind(this);
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   }

//   async handleSubmit(event) {
//     event.preventDefault();
//     this.setState({ error: "" });
//     try {
//       await signin(this.state.email, this.state.password);
//     } catch (error) {
//       this.setState({ error: error.message });
//     }
//   }

//   async googleSignIn() {
//     try {
//       await signInWithGoogle();
//     } catch (error) {
//       this.setState({ error: error.message });
//     }
//   }

//   async githubSignIn() {
//     try {
//       await signInWithGitHub();
//     } catch (error) {
//       this.setState({ error: error.message });
//     }
//   }

//   render() {
//     return (
//       <div className="container">
//         <form
//           className="mt-5 py-5 px-5"
//           autoComplete="off"
//           onSubmit={this.handleSubmit}
//         >
//           <h1>
//             Login to
//             <Link className="title ml-2" to="/">
//               Chatty
//             </Link>
//           </h1>
//           <p className="lead">
//             Fill in the form below to login to your account.
//           </p>
//           <div className="form-group">
//             <input
//               className="form-control"
//               placeholder="Email"
//               name="email"
//               type="email"
//               onChange={this.handleChange}
//               value={this.state.email}
//             />
//           </div>
//           <div className="form-group">
//             <input
//               className="form-control"
//               placeholder="Password"
//               name="password"
//               onChange={this.handleChange}
//               value={this.state.password}
//               type="password"
//             />
//           </div>
//           <div className="form-group">
//             {this.state.error ? (
//               <p className="text-danger">{this.state.error}</p>
//             ) : null}
//             <button className="btn btn-primary px-5" type="submit">Login</button>
//           </div>
//           <p>You can also log in with any of these services</p>
//           <button className="btn btn-danger mr-2" type="button" onClick={this.googleSignIn}>
//             Sign in with Google
//           </button>
//           <button className="btn btn-secondary" type="button" onClick={this.githubSignIn}>
//             Sign in with GitHub
//           </button>
//           <hr />
//           <p>
//             Don't have an account? <Link to="/signup">Sign up</Link>
//           </p>
//         </form>

//       </div>
//     );
//   }
// }