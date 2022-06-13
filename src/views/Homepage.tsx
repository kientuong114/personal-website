import { FC } from "react";
import {HomepageContent} from "../components/Homepage";
import { NavbarOrSidebar } from "../components/Navbar";

export const Homepage: FC = () => {
    return (
        <>
            <NavbarOrSidebar/>
            <HomepageContent/>
        </>
    )
}
