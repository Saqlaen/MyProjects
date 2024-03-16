import "./App.css";
import Home from "./Components/Routes/Home/home.component";
import Navigation from "./Components/Routes/Navigation/navigation.component";
import { Route, Routes } from "react-router-dom";

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
     </Route>
    </Routes>
  );
}

export default App;
