import { FC, useState } from "react";
import useWindowDimensions from "../Utils/WindowSize";
import {
    NavbarWrapper,
    NavEntry,
    NavEntryExt,
    SidebarWrapper,
    OpenSidebar,
    CloseButtonWrapper,
    HamburgerMenuWrapper,
    SidebarEntryWrapper,
    SidebarEntry,
    SidebarEntryExt,
} from './NavbarComponents';
import { DOMAIN } from '../../config/config';

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
                Public Keys
            </NavEntry>
            {/* <NavEntry to={"/cv"}> */}
            {/*     Curriculum */}
            {/* </NavEntry> */}
            <NavEntryExt href={`https://blog.${DOMAIN}`}>
                Blog
            </NavEntryExt>
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
                        Public Keys
                    </SidebarEntry>
                </SidebarEntryWrapper>
                <SidebarEntryWrapper>
                    <SidebarEntry to={"/cv"} onClick={toggle}>
                        Curriculum
                    </SidebarEntry>
                </SidebarEntryWrapper>
                <SidebarEntryWrapper>
                    <SidebarEntryExt href={`https://blog.${DOMAIN}`} onClick={toggle}>
                        Blog
                    </SidebarEntryExt>
                </SidebarEntryWrapper>
            </OpenSidebar>
        </SidebarWrapper>
    )
}
