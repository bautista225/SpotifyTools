import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks";
import { useRef } from "react";

// Cómo puedo poner los botones en la navbar centrados en vez de que estén totalmente a la derecha

function NavBar({ user }) {
  const logout = useLogout();

  const handleLogoutButtonClick = () => {
    closeOffCanvas();
    logout();
  };

  const offCanvasRef = useRef();
  const closeOffCanvas = () => offCanvasRef.current.backdrop.click();

  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3 fixed-top">
      <Container fluid className="justify-content-start">
        {user && (
          <Navbar.Toggle aria-controls={`offcanvasNavbar`} className="me-3" />
        )}
        <Navbar.Brand as={Link} to="/" className="bg-body-tertiary">
          <i className="bi bi-spotify" /> Spotify tools
        </Navbar.Brand>
        {user && (
          <Navbar.Offcanvas
            id={`offcanvasNavbar`}
            aria-labelledby={`offcanvasNavbarLabel`}
            placement="start"
            ref={offCanvasRef}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel`}>
                <i className="bi bi-spotify" /> Spotify tools
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/profile" onClick={closeOffCanvas}>
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/playlists" onClick={closeOffCanvas}>
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
