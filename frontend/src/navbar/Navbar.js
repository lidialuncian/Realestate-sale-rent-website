import './Navbar.css'
import AuthenticationService from "../AuthenticationService";
const Navbar = () =>{
    const isClient = AuthenticationService.isClientLoggedIn();
    const isAdmin = AuthenticationService.isAdminLoggedIn()
    return (
        <header>
            <div className={"nav-area"}>
                <a href={"/home"} className={"logo"}>
                    imobil.ro
                </a>
                {(!isAdmin && !isClient) && <nav>
                    <ul className={"menus"}>
                        <li className={"menu-items"}><a href={"/login"}>Login/Signup</a></li>
                    </ul>
                </nav>}
                {(isAdmin && !isClient) && <nav>
                    <ul className={"menus"}>
                        <li className={"menu-items"}><a href={"/admin"}>Admin</a></li>
                    </ul>
                </nav>}
                {(isAdmin || isClient) && <nav>
                    <ul className={"menus"}>
                        <li className={"menu-items"}><a href={"/home"}>Acasa</a></li>
                        <li className={"menu-items"}><a href={"/despre-noi"}>Despre Noi</a></li>
                        <li className={"menu-items"}><a href={"/noutati"}>Noutati</a></li>
                        <li className={"menu-items"}>
                            <a href="/inchirieri">Inchirieri</a>
                            <ul>
                                <li><a href="#apartamente">Apartamente</a></li>
                                <li><a href="#case">Case</a></li>
                            </ul>
                        </li>
                        <li className={"menu-items"}>
                            <a href={"/vanzari"}>Vanzari</a>
                            <ul>
                                <li><a href="#apartamente">Apartamente</a></li>
                                <li><a href="#case">Case</a></li>
                            </ul>
                        </li>
                        <li className={"menu-items"}><a href={"/contact"}>Contact</a></li>
                        <li className={"menu-items"}><a href={"/my-profile"}>Profilul Meu</a></li>
                        <li className={"menu-items"}><a href={"/login"} onClick={AuthenticationService.logout}>Logout</a></li>
                    </ul>
                </nav>}
            </div>
        </header>

    )
}

export default Navbar;