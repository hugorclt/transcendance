import NavBar from "../../components/NavBar/NavBar";
import NavBarProvider from "./NavBarContext";

function NavBarPage() {
  return (
    <NavBarProvider>
      <NavBar />
    </NavBarProvider>
  );
}

export default NavBarPage;
