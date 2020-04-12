import React from 'react'
import media from 'styled-media-query'
import styled from 'styled-components'
import DemoGallery from './DemoGallery'

const StyledHero = styled.div`
  padding: 0 3rem 3rem 3rem;
  margin-top: 64px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const H2 = styled.h2`
  font-size: calc(2.8rem + 1.5vw);
  color: #111;
  letter-spacing: -0.15rem;
  ${media.lessThan('medium')`
    font-size: 2.3rem
  `}
  ${media.lessThan('small')`
    font-size: 1.7rem
  `}
  & > .urgent {
    font-style: italic;
    letter-spacing: -0.12rem;
  }
`

const P = styled.p`
  text-align: left;
`


const Hero = () => {
  
  return (
    <StyledHero>
      <H2>Plan Fun For Later<br/>
      <span className="urgent">Help Local Businesses Now</span></H2>
      <P><strong>Loofti</strong> (short for <strong>Loo</strong>king <strong>f</strong>orward <strong>t</strong>o <strong>i</strong>t) helps you support local businesses now by making fun plans with friends for later.</P>

      <h3>HOW IT WORKS:</h3>
      <DemoGallery />
      
    </StyledHero>
  )
}

export default Hero