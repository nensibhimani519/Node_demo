import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import user1 from "../assets/images/users/user4.jpg";
import SocketAdminStatus from "../components/common/SocketAdminStatus";
import { userLogout } from "../redux/actions";
import { getDefaultRoute, USER_TYPES } from "../util";

const Header = ({ isAuthenticated = true, hideMobileMenu }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { role, id } = useSelector((state) => state.user);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [admindropdownOpen, setadminDropdownOpen] = React.useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const admintoggle = () => setadminDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  useEffect(() => {
    const adjustHeader = (e) => {
      if (
        typeof window.innerWidth === "number" &&
        window.innerWidth < 768 &&
        role === USER_TYPES.ADMIN
      ) {
        setIsOpen(true);
      }
    };
    adjustHeader()
    window.addEventListener("resize", adjustHeader);
    window.addEventListener("load", adjustHeader);

    return () => {
      window.removeEventListener("resize", adjustHeader);
      window.removeEventListener("load", adjustHeader);
    };
  }, []);

  return (
    <Navbar
      expand="md"
      onClick={(e) => {
        hideMobileMenu();
      }}
      className="border-bottom fix-header"
    >
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          <Link
            to={getDefaultRoute(role)}
            className="text-decoration-none text-dark "
          >
            <h4 className="mb-0">Salon</h4>
          </Link>
        </div>
        <Link
          to={getDefaultRoute(role)}
          className="text-decoration-none text-dark d-lg-none"
        >
          <h5 className="mb-0 me-2">Salon</h5>
        </Link>
        {isAuthenticated && (
          <Button
            color="primary"
            className=" d-lg-none"
            onClick={(e) => {
              e.stopPropagation();
              showMobilemenu();
            }}
          >
            <i className="bi bi-list"></i>
          </Button>
        )}
      </div>
      {isAuthenticated && (
        <div className="hstack gap-2">
          {role !== USER_TYPES.SUPER_ADMIN && (
            <Button
              color="primary"
              size="sm"
              className="d-sm-block d-md-none"
              onClick={Handletoggle}
            >
              {isOpen ? (
                <i className="bi bi-x"></i>
              ) : (
                <i className="bi bi-three-dots-vertical"></i>
              )}
            </Button>
          )}
          {id && [USER_TYPES.ADMIN, USER_TYPES.SUPER_ADMIN].includes(role) && (
            <Dropdown
              isOpen={admindropdownOpen}
              toggle={admintoggle}
              className="d-block d-md-none"
            >
              <DropdownToggle color="transparent">
                <img
                  src={user1}
                  alt="profile"
                  className="rounded-circle"
                  width="30"
                />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={userLogout}>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      )}

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar></Nav>
        {id && role === USER_TYPES.ADMIN && <SocketAdminStatus />}
      </Collapse>
      {id && [USER_TYPES.ADMIN, USER_TYPES.SUPER_ADMIN].includes(role) && (
        <Dropdown
          isOpen={dropdownOpen}
          toggle={toggle}
          className="d-none d-md-block"
        >
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={userLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
      {id && [USER_TYPES.CUSTOMER].includes(role) && (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={userLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </Navbar>
  );
};

export default Header;
