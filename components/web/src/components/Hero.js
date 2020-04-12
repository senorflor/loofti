import React from 'react'
import media from 'styled-media-query'
import styled from 'styled-components'
import DemoGallery from './DemoGallery'

const StyledHero = styled.div`
  padding: 0 3rem 3rem 3rem;
  margin-top: 64px;
  background: url('${process.env.PUBLIC_URL}/coffee-shop.jpg') no-repeat center center fixed #555;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const H2 = styled.h2`
  font-size: calc(2.8rem + 1.5vw);
  color: white;
  text-shadow: 3px 3px 3px rgba(0,0,0,0.7);
  letter-spacing: -0.15rem;
  ${media.lessThan('medium')`
    letter-spacing: -0.09rem;
    font-size: 2.3rem
  `}
  ${media.lessThan('small')`
  letter-spacing: -0.06rem;
    font-size: 1.7rem
  `}
  & > .urgent {
    font-style: italic;
    letter-spacing: -0.12rem;
  }
`

const P = styled.p`
  text-align: left;
  color: white;
  text-shadow: 2px 2px 2px black;
`

const H3 = styled.h3`
  color: white;
  text-shadow: 3px 3px 3px rgba(0,0,0,0.7);
`

const Hero = () => {
  
  return (
    <StyledHero>
      <H2>Make Plans For Later<br/>
      <span className="urgent">Help Local Businesses Now</span></H2>
      <P><strong>Loofti</strong> (short for <strong>Loo</strong>king <strong>f</strong>orward <strong>t</strong>o <strong>i</strong>t) helps you support local businesses now by making fun plans with friends for later.</P>

      <H3>HOW IT WORKS:</H3>
      <DemoGallery />
      
    </StyledHero>
  )
}

export default Hero