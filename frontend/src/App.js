import {BrowserRouter as Router, Navigate as Redirect, Route, Routes} from "react-router-dom"
import Acasa from "./acasa/Acasa";
import DespreNoi from "./despreNoi/DespreNoi";
import Noutati from "./noutati/Noutati";
import Contact from "./contact/Contact";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Vanzari from "./vanzari/Vanzari";
import Inchirieri from "./inchirieri/Inchirieri";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import Profil from "./profil/Profil";
import AdminPage from "./admin/AdminPage";
import AnuntPage from "./anunt/AnuntPage";

function App() {
  const defaultRoute = window.location.pathname === "/" ? <Redirect to="/login"/> : undefined;
  return (
    <>
        <Navbar/>
        <Router>
            <Routes>
                    <Route exact path='/home' element={<Acasa/>}/>
                    <Route exact path='/login' element={<Login/>}/>
                    <Route exact path='/signup' element={<Signup/>}/>
                    <Route exact path='/despre-noi' element={<DespreNoi/>}/>
                    <Route exact path='/noutati' element={<Noutati/>}/>
                    <Route exact path='/contact' element={<Contact/>}/>
                    <Route exact path='/inchirieri' element={<Inchirieri/>}/>
                    <Route exact path='/vanzari' element={<Vanzari/>}/>
                    <Route exact path='/my-profile' element={<Profil/>}/>
                    <Route exact path='/admin' element={<AdminPage/>}/>
                    <Route exact path='/anunt/:id' element={<AnuntPage/>}/>
            </Routes>
            {defaultRoute}
        </Router>
        <Footer/>
    </>
  );
}

export default App;
