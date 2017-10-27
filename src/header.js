import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
	font-size: 1.5em;
	font-family: Helvetica;
	text-align: center;
	color: #f6f6f6;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
	padding: 20px;
	background: #333;
`;
class Header extends React.Component{
    // Create a Title component that'll render an <h1> tag with some styles
    constructor() {
        super();

    }
    render(){
        return(
            <div>
            <Wrapper>
            <Title>
            GitHub Stars
        </Title>
        </Wrapper>
            </div>
        )
    }

}

export default Header;