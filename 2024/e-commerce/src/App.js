import "./App.css";
import Home from "./Components/Routes/Home/home.component";
import Navigation from "./Components/Routes/Navigation/navigation.component";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Components/Routes/Sign-In/SignIn.component";

const App = ()  => {

  return (
    <Routes>
        {/* nested routes 
            parent route
        */}
      <Route path="/" Component={Navigation}>
        {/* child route 
            by default when you land on the page the Home component will be rendered
        */}
        <Route index Component={Home}/>
        <Route path="shop" Component={Shop}/>
        <Route path="signin" Component={SignIn} />
     </Route>
    </Routes>
  );
}

const Shop = () => {
    return (
        <>
            <div>I am shop Component</div>
        </>
    )
}

export default App;
