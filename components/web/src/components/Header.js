import React from 'react'
import media from 'styled-media-query'
import styled from 'styled-components'

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #eaeaea;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const H1 = styled.h1`
  margin: 0 2rem;
  ${media.lessThan('medium')`
    font-size: 1.5rem
  `}
  ${media.lessThan('small')`
    margin: 0 1rem;
    font-size: 1.5rem
  `}
`

const Header = () => (
  <StyledHeader>
    <H1>🔍</H1>
    <H1>🏘️&nbsp;Loofti.com</H1>
    <H1>🍔</H1>
  </StyledHeader>
)

export default Header