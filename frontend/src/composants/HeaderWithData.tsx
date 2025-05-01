import { Container, Navbar } from "react-bootstrap";
import { getImage, User } from "../redux/types";
import "../pages/Dashboard.css"

type HeaderWithDataProps = {
  pompier: User
};

export default function HeaderWithData({ pompier }: HeaderWithDataProps) {
  return (
    <Navbar className="navbar-light bg-white shadow mb-2">
        <div className="container-fluid d-flex justify-content-start align-item">
    <img src="/assets/caserne.png"/>
    <span className="mb-0">{pompier.caserne.name}</span>
    </div>
      <div className="container-fluid d-flex justify-content-end align-items-center">
        <span  className="mb-0 text-muted">{pompier.username}</span>
        <img
          src={getImage(pompier.grade)}
          className="rounded-circle img-profile m-2"
        />
        </div>
    </Navbar>
  );
}
