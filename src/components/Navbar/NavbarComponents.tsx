import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-top: 2rem;
    padding-left: 20vw;
    padding-right: 20vw;
    margin-bottom: 2rem;
`;

export const NavEntry = styled(NavLink)`
    text-align: center;
    text-decoration: none;
    color: #fff;
    font-family: 'Raleway';
`;

export const NavEntryExt = styled.a`
    text-align: center;
    text-decoration: none;
    color: #fff;
    font-family: 'Raleway';
`;

export const SidebarWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 2rem;
`

export const OpenSidebar = styled.div<{isOpen: boolean}>`
    opacity: ${({isOpen}) => isOpen ? 1 : 0};
    top: ${({isOpen}) => isOpen ? 0 : '-120%'};
    background-color: #101010;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2;
    transition: all 0.2s ease-in-out;
`;

export const CloseButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const HamburgerMenuWrapper = styled.div`
    margin-right: 2rem;
`

export const SidebarEntry = styled(NavLink)`
    text-align: center;
    text-decoration: none;
    color: #fff;
    font-family: 'Raleway';
    font-size: 1.5rem;
    margin-bottom: 2rem;
`

export const SidebarEntryExt = styled.a`
    text-align: center;
    text-decoration: none;
    color: #fff;
    font-family: 'Raleway';
    font-size: 1.5rem;
    margin-bottom: 2rem;
`

export const SidebarEntryWrapper = styled.div`
    display: flex;
    justify-content: center;
`;
