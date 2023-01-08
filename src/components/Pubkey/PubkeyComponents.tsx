import styled from "styled-components";
import {FaRegClipboard} from "react-icons/fa";

export const PubkeyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
`;

export const PubkeyDescription = styled.p`
    font-family: 'Raleway';
    font-size: 1.2rem;
    text-align: center;
    color: #fff;
    max-width: 50vw;
`

export const PubkeyLink = styled.a`
    color: #fff;
`

export const PublicKeyBox = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #1e1e1e;
    margin: 2rem;
    padding: 1rem 2rem 1rem 2rem;
    align-items: center;

    @media only screen and (max-width: 720px){
        margin: 0.2rem;
        padding: 0.5rem 1rem 0.5rem 1rem;
    }
`

export const PublicKeyText = styled.p`
    color: #fff;
    font-family: 'Share Tech Mono';
    font-size: 1.4rem;
    word-break: break-all;
    text-align: center;
    margin: 0 2rem 0 0;

    @media only screen and (max-width: 720px){
        margin: 0 0.5rem 0 0;
        font-size: 1rem;
    }
`

export const ClipboardButton = styled(FaRegClipboard)`
    min-width: 3rem;
    color: #fff;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    :hover {
        color: #aaa;
    }
`
