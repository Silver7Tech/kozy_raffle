import React, { createRef } from "react";
import Logo from '../assets/logo.svg';
import { NavLink } from "react-router-dom";

const Header = () => {
    const menuBtn = createRef();
    const menu = createRef();
    const navToggle = () => {
        menuBtn.current.classList.toggle('open');
        menu.current.classList.toggle('flex');
        menu.current.classList.toggle('hidden');
        menu.current.classList.toggle('open-transform');
    }
    return (
        <nav className="flex flex-col sm:flex-row w-11/12 justify-between items-center px-4 py-4 sm:px-6 mx-auto shadow sm:shadow-none">
            <div className="w-full sm:w-auto self-start sm:self-center flex flex-row sm:flex-none flex-no-wrap justify-between items-center">
                <img src={Logo} alt="Logo"/>
                <div className="sm:hidden block flex flex-row items-center">
                    <button className="hover:text-white rounded-full bg-green px-6 py-2 text-0sm text-white font-medium font-poppins">Connect Wallet</button>
                    <button ref={menuBtn} className="hamburger block focus:outline-none" type="button" onClick={navToggle}>
                        <span className="hamburger__top-bun"></span>
                        <span className="hamburger__middle-bun"></span>
                        <span className="hamburger__bottom-bun"></span>
                    </button>
                </div>
            </div>
            <div ref={menu} className="w-full sm:w-auto sm:self-center sm:flex flex-col sm:flex-row items-center h-full hidden">
                <div className="w-full sm:w-auto sm:self-center flex flex-col sm:flex-row items-center h-full pr-10 nav-link">
                    <NavLink className="text-white hover:font-bold text-1sm w-full no-underline sm:w-auto sm:pr-4 py-1 sm:py-1 " to="/" activeclassname="active">Live</NavLink>
                    <NavLink className="text-white hover:font-bold text-1sm w-full no-underline sm:w-auto sm:pr-4 py-1 sm:py-1 " to="/closed" activeclassname="active">Closed</NavLink>
                    <NavLink className="text-white hover:font-bold text-1sm w-full no-underline sm:w-auto sm:pr-4 py-1 sm:py-1 " to="/winners" activeclassname="active">Winners</NavLink>
                    {/* <a className="text-white hover:text-yellow text-1sm font-oxygen w-full no-underline sm:w-auto sm:pr-4 py-1 sm:py-1 " href="#faq">FAQ</a> */}
                </div>
                <button className="hover:text-white rounded-full bg-green px-6 py-2 text-0sm text-white font-medium font-Poppins hidden sm:flex border-4 border-green hover:bg-black">Connect Wallet</button>
            </div>
        </nav>
    )
}

export default Header;