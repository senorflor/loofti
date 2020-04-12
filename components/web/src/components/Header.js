import React from 'react'
import media from 'styled-media-query'
import styled from 'styled-components'

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #fcea22;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 1024;
`

const H1 = styled.h1`
  margin: 0 2rem;
  font-family: 'Damion', sans-serif;

  ${media.lessThan('medium')`
    font-size: 2rem;
  `}
  ${media.lessThan('small')`
    margin: 0 1rem;
    font-size: 1.8rem;
  `}
`

const Header = () => (
  <StyledHeader>
    <H1>🔍</H1>
    <H1>Loofti</H1>
    <H1>🍔</H1>
  </StyledHeader>
)

export default Header