import React from 'react'
import {
  Link
} from 'react-router-dom'
import media from 'styled-media-query'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  background: #fcea22;
  display: grid;
  grid-template-columns: auto 300px 300px auto;
  grid-template-rows: auto 40px 10px;
  ${media.lessThan('medium')`
    height: inherit;
    grid-template-columns: 3rem calc(50% - 3rem) calc(50% - 3rem) 3rem;
    font-size: 0.8rem;
  `}
`

const LeftCol = styled.div`
  margin: 1.5rem 0;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`

const RightCol = styled.div`
  margin: 1.5rem 0;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
`

const Copyright = styled.div`
  display: flex;
  align-items: center;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
  font-size: 0.8rem;
  color: #333;
`

const H3 = styled.h3`
  font-size: 1.2rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  &, &:hover, &:visited, &:focus {
    color: #111;
  }
`

const Footer = () => (
  <StyledFooter>
    <LeftCol>
      <H3>About</H3>
      <p><StyledLink to='/a/team'>Who&rsquo;s behind this?</StyledLink></p>
      <p><StyledLink to='/a/app'>Why?</StyledLink></p>
    </LeftCol>
    <RightCol>
      <H3>Get involved</H3>
      <p><StyledLink to='/b/claim'>Claim your listing</StyledLink></p>
      <p><StyledLink to='/b/add'>Add a local business</StyledLink></p>
    </RightCol>
    <Copyright>
      <small>&copy; 2020 Boilerplatter, Inc. All rights reserved.</small>
    </Copyright>
  </StyledFooter>
)

export default Footer
