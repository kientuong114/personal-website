import { FC } from "react";
import useWindowDimensions from "../Utils/WindowSize";

import {
    NavbarWrapper,
    NavEntry
} from './NavbarComponents';

export const NavbarOrSidebar: FC = () => {
    const w = useWindowDimensions().width;

    return (
        w > 720 ? <Navbar/> : <Sidebar/>
    )

}

export const Navbar: FC = () => {
    return (
        <NavbarWrapper>
            <NavEntry to={"/"}>
                Homepage
            </NavEntry>
            <NavEntry to={"/pubkey"}>
                My Age Pubkey 
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

export const Sidebar: FC = () => {
    return(
        <>
        </>
    )
}
