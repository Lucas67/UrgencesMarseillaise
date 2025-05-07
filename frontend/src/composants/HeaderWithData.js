import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navbar } from "react-bootstrap";
import "../pages/Dashboard.css";
export default function HeaderWithData({ pompier }) {
    return (_jsxs(Navbar, { className: "navbar-light bg-white shadow mb-2", children: [_jsx("div", { className: "container-fluid d-flex justify-content-start align-item" }), _jsx("div", { className: "container-fluid d-flex justify-content-end align-items-center", children: _jsx("span", { className: "mb-0 text-muted", children: pompier.username }) })] }));
}
