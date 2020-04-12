import React from 'react'
import media from 'styled-media-query'
import styled from 'styled-components'

const StyledHero = styled.div`
  padding: 0 3rem;
  margin-top: 64px;
  height: calc(100vh - 192px);
  background: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${media.lessThan('medium')`
    height: calc(100vh - 100px);
  `}
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

const Hero = () => (
  <StyledHero>
    <H2>Plan Fun For Later<br/>
    <span className="urgent">Help Local Businesses Now</span></H2>
    <P><strong>Loofti</strong> (short for <strong>Loo</strong>king <strong>f</strong>orward <strong>t</strong>o <strong>i</strong>t) helps you support local businesses now by making fun plans with friends for later.</P>

    <p>How it works:</p>


    <h3>TODO: Pick stops and make plans</h3>
    <p>Landing page preview one: user selecting merchant from profile for itinerary dot jpeg</p>

    <h3>TODO: Support local businesses, now</h3>
    <p>Landing page preview two: user adding a gift card (or donating to help them get online?)</p>

    <h3>TODO: Invite friends</h3>
    <p>Landing page preview two: show option to gift the trip or split the (future) bill, invite friends, and send emails to all!</p>
  </StyledHero>
)

export default Hero