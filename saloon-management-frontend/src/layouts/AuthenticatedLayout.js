import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useRef } from "react";

const AuthenticatedLayout = ({ children }) => {
  const sidebarRef = useRef(null)
  const hideMobileMenu = () => {
    document.getElementById("sidebarArea").classList.remove("showSidebar");
  };
  
  return (
    <main>
      {/********header**********/}
      <Header hideMobileMenu={hideMobileMenu} />
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside  ref={sidebarRef} className="sidebarArea shadow" id="sidebarArea">
          <Sidebar sidebarRef={sidebarRef}  />
        </aside>
        {/********Content Area**********/}
        <div className="contentArea" onClick={hideMobileMenu}>
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            {children}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default AuthenticatedLayout;
