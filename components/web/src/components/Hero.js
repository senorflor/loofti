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
  font-size: calc(2.5rem + 1.5vw);
  font-family: Avenir;
  font-weight: 900;
  color: #111;
  letter-spacing: -0.02rem;
  ${media.lessThan('medium')`
    font-size: 2.3rem
`}
  ${media.lessThan('small')`
    font-size: 1.7rem
  `}
`

const Hero = () => (
  <StyledHero>
    <H2>Make Plans Now<br/>
    To Get Out Later</H2>
    <p>Loofti (short for Looking Forward To It) helps you support local businesses by making plans with friends, now.</p>


    <h3>TODO: Pick stops and make plans</h3>
    <p>Landing page preview one: user selecting merchant from profile for itinerary dot jpeg</p>

    <h3>TODO: Support local businesses, now</h3>
    <p>Landing page preview two: user adding a gift card (or donating to help them get online?)</p>

    <h3>TODO: Invite friends</h3>
    <p>Landing page preview two: show option to gift the trip or split the (future) bill, invite friends, and send emails to all!</p>
  </StyledHero>
)

export default Hero