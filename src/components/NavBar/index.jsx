import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks";
import { useState } from "react";

// Cómo puedo poner los botones en la navbar centrados en vez de que estén totalmente a la derecha

function NavBar({ user }) {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const logout = useLogout();

  const handleLogoutButtonClick = () => {
    hideOffcanvas();
    logout();
  };

  const hideOffcanvas = () => {
    setShowOffcanvas(false);
  };
  const toggleOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3 fixed-top">
      <Container fluid className="justify-content-start">
        {user && (
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar`}
            className="me-3"
            onClick={toggleOffcanvas}
          />
        )}
        <Navbar.Brand as={Link} to="/" className="bg-body-tertiary">
          <i className="bi bi-spotify" /> Spotify tools
        </Navbar.Brand>
        {user && (
          <Navbar.Offcanvas
            id={`offcanvasNavbar`}
            aria-labelledby={`offcanvasNavbarLabel`}
            placement="start"
            show={showOffcanvas}
          >
            <Offcanvas.Header>
              <Offcanvas.Title id={`offcanvasNavbarLabel`}>
                <i className="bi bi-spotify" /> Spotify tools
              </Offcanvas.Title>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={hideOffcanvas}
              ></button>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/profile" onClick={hideOffcanvas}>
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/playlists" onClick={hideOffcanvas}>
                  Playlists
                </Nav.Link>
              </Nav>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={handleLogoutButtonClick}>Logout</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
