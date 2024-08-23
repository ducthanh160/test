import React, { useState } from "react";
import "./App.css";

function App() {
    // State để theo dõi trạng thái của sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Hàm xử lý khi nhấn vào nút hamburger
    const handleToggleSidebar = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };

    return (
        <>
            <header className="bg-dark navbar navbar-expand-lg bd-navbar sticky-top">
                <nav className="container-fluid text-white">
                    <div className="flex items-center justify-between w-full h-16 gap-0 sm:gap-3 fs-2">
                        <div className="text-white d-flex align-items-center">
                            <i
                                className="fa-solid fa-bars fs-3"
                                id="toggle-btn"
                                onClick={handleToggleSidebar}
                            ></i>
                            <a className="logo text-white" href="#">
                                Logo
                            </a>
                        </div>
                    </div>
                    <div className="d-flex justify-center gap-2">
                        <div className="flex items-center -space-x-2.5 xs:space-x-0 ">
                            <i className="fa-solid fa-bell"></i>
                        </div>
                        <div className="mx-2.5 gap-1.5 hidden lg:flex">
                            <div className="dropdown d-flex">
                                <p
                                    className="dropdown-toggle d-flex align-items-center"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    tên
                                </p>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Thông tin của tôi
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="wrapper">
                <aside id="sidebar" className={isSidebarOpen ? "show" : ""}>
                    <ul className="sidebar-nav">
                        <li className="sidebar-item">
                            <a href="" className="sidebar-link">
                                <i className="fa-regular fa-user"></i>
                                <span>User</span>
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a
                                href="#"
                                className="sidebar-link has-dropdown collapsed"
                                data-bs-toggle="collapse"
                                data-bs-target="#auth"
                                aria-expanded="false"
                                aria-controls="auth"
                            >
                                <i className="fa-solid fa-heart"></i>
                                <span>Danh sách</span>
                            </a>
                            <ul
                                id="auth"
                                className="sidebar-dropdown collapse"
                                data-bs-parent="#sidebar"
                            >
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">
                                        Danh sách nhân viên
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </aside>

                <main className="main"></main>
            </div>
        </>
    );
}

export default App;
