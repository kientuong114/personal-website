import { FC, useState } from "react";
import useWindowDimensions from "../Utils/WindowSize";
import {
    NavbarWrapper,
    NavEntry,
    SidebarWrapper,
    OpenSidebar,
    CloseButtonWrapper,
    HamburgerMenuWrapper,
    SidebarEntryWrapper,
    SidebarEntry,
} from './NavbarComponents';

import {GiHamburgerMenu} from 'react-icons/gi';
import {MdOutlineClose} from 'react-icons/md';

export const NavbarOrSidebar: FC = () => {
    const w = useWindowDimensions().width;
    const [isOpen, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!isOpen);
    }

    return (
        w > 720 ? <Navbar/> : <Sidebar isOpen={isOpen} toggle={toggle}/>
    )

}

export const Navbar: FC = () => {
    return (
        <NavbarWrapper>
            <NavEntry to={"/"}>
                Homepage
            </NavEntry>
            <NavEntry to={"/pubkey"}>
                My Public Keys
            </NavEntry>
            {/* <NavEntry to={"/blog"}> */}
            {/*     Blog */}
            {/* </NavEntry> */}
            {/* <NavEntry to={"/cv"}> */}
            {/*     My CV */}
            {/* </NavEntry> */}
        </NavbarWrapper>
    )

}

export const Sidebar: FC<{isOpen: boolean, toggle: () => void}> = ({isOpen, toggle}) => {
    return (
        <SidebarWrapper>
            <HamburgerMenuWrapper>
                <GiHamburgerMenu size={40} color={"white"} onClick={toggle}/>
            </HamburgerMenuWrapper>
            <OpenSidebar isOpen={isOpen}>
                <CloseButtonWrapper>
                    <MdOutlineClose size={40} color={"white"} onClick={toggle} style={{padding: "2rem"}}/>
                </CloseButtonWrapper>
                <SidebarEntryWrapper>
                    <SidebarEntry to={"/"} onClick={toggle}>
                        Homepage
                    </SidebarEntry>
                </SidebarEntryWrapper>
                <SidebarEntryWrapper>
                    <SidebarEntry to={"/pubkey"} onClick={toggle}>
                        My Public Keys
                    </SidebarEntry>
                </SidebarEntryWrapper>
            </OpenSidebar>
        </SidebarWrapper>
    )
}
