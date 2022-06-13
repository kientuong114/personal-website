import styled from "styled-components";

export const HomepageWrapper = styled.div`
    display: grid;
    padding-left: 7rem;
    padding-right: 7rem;
    grid-column-gap: 5rem;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: fit-content(1rem);

    @media only screen and (max-width: 1200px){
        grid-template-columns: 1fr;
        grid-template-rows: 1fr fit-content(1em);
        grid-row-gap: 5rem;
        justify-items: center;
    }
`;

export const HomepageText = styled.div`
    font-family: 'Raleway';
    color: #fff;
    max-width: 40vw;

    @media only screen and (max-width: 1200px){
        max-width: 80vw;
    }
`;

export const HomepageTextTitle = styled.h1`
    font-weight: 800;
    font-size: 4rem;
`;

export const HomepageTextP = styled.p`
    font-size: 1.3rem;
`;

export const HomepageImageWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const HomepageImageContent = styled.img`
    width: 18rem;
    height: 18rem;
    border-radius: 50%;
    border: solid 5px #fff;
    z-index: 2;
`

export const HomepageImageDeco = styled.div`
    position: relative;
    left: -7rem;
    margin-right: -7rem;
    content: '';
    width: 18rem;
    height: 18rem;
    border-radius: 50%;
    border: dotted 3px #fff;
    z-index: 1;
`

export const FooterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
    margin-bottom: 5rem;
`;

export const FooterTitle = styled.h1`
    font-family: 'Raleway';
    color: #fff;
`;

export const FooterButtonWrapper = styled.div`
    display: flex;
    width: 50vw;
    flex-direction: row;
    justify-content: space-around;
`;

export const FooterButtonLink = styled.a`
`;
