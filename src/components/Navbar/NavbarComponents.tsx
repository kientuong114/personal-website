import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

export const SidebarWrapper = styled.div`
`
