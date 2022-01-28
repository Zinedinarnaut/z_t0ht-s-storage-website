import React, {useEffect, useRef, useState} from 'react';
import {toast, ToastContainer, cssTransition, Zoom} from 'react-toastify';
import Typing from 'react-typing-animation';
import 'react-toastify/dist/ReactToastify.css';
import {CSSTransition} from 'react-transition-group';
import styled from "styled-components";
import '../index.css';

// icons
import {ReactComponent as CaretIcon} from '../icons/caret.svg';
import {ReactComponent as PlusIcon} from '../icons/plus.svg';
import {ReactComponent as CogIcon} from '../icons/cog.svg';
import {ReactComponent as ChevronIcon} from '../icons/chevron.svg';
import {ReactComponent as ArrowIcon} from '../icons/arrow.svg';
import {ReactComponent as BoltIcon} from '../icons/bolt.svg';
import {ReactComponent as Github} from '../icons/github.svg';

function Dropdown() {


    const github = "https://github.com/Zinedinarnaut/z_t0ht-s-storage-website"

    const notify = () => toast.error('404', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        transition: Zoom,
        delay: 100,

    });

    const TypeAnimationContainer = styled.div`
      position: absolute;
      left: 3rem;
      top: 10px;
    `

    return (

        <Navbar>
            <TypeAnimationContainer>
                <Typing>
                    <h2>z_t0ht's File Storage</h2>
                </Typing>
            </TypeAnimationContainer>

            <button onClick={notify}>Github</button>
            <ToastContainer theme="Dark" />

            <NavItem icon={<PlusIcon/>} href={github}/>

            <NavItem icon={<CaretIcon/>}>
                <DropdownMenu></DropdownMenu>
            </NavItem>

        </Navbar>

    );
}

function Navbar(props) {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">{props.children}</ul>
        </nav>
    );
}

function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
        <li className="nav-item">
            <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
                {props.icon}
            </a>

            {open && props.children}
        </li>
    );
}

function DropdownMenu() {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }

    return (

        <div className="dropdown" style={{height: menuHeight}} ref={dropdownRef}>

            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem>My Profile</DropdownItem>
                    <DropdownItem
                        leftIcon={<CogIcon/>}
                        rightIcon={<ChevronIcon/>}
                        goToMenu="settings">
                        Settings
                    </DropdownItem>

                </div>
            </CSSTransition>


            <CSSTransition
                in={activeMenu === 'settings'}
                timeout={500}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem goToMenu="main" leftIcon={<ArrowIcon/>}>
                        <h2>Go back</h2>
                    </DropdownItem>
                    <DropdownItem leftIcon={<BoltIcon/>}>Github</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    );
}

export default Dropdown;
