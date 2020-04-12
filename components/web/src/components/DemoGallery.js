import React, { useState } from 'react'
import styled from 'styled-components'
import { default as Slider } from 'react-swipeable-views'

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: 30px auto 30px;
  grid-template-areas: ". gallery .";
`

// I am so sorry
const HackySlideNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: 'Sigmar One', sans-serif;
  color: white;
`

const StyledSlider = styled(Slider)`
  max-width: 450px;
  box-shadow: rgba(0,0,0,0.5) 0px 1px 3px, rgba(0,0,0,0.6) 0px 16px 10px -10px;
  border-radius: 3px;
`

const PreviewCard = styled.div`
  height: 300px;
  border-radius: 2px;

  background: white;
  padding: 1.5rem;
  & > p {
    color: #444;
    text-align: left;
  }
`

const H4 = styled.h4`
  font-size: 1.1rem;
  margin-top: 0;
`

const DemoGallery = () => {
  const [slide, setSlide] = useState(0)
  return (
    <GalleryGrid>
      {
        (slide > 0) ? <HackySlideNav
          onClick={() => {
            setSlide(Math.max(0, slide-1))
          }}>
          {'<'}
        </HackySlideNav> : <div></div>
      }
      <StyledSlider className='gallery' index={slide} enableMouseEvents={true} onChangeIndex={setSlide}>
        <PreviewCard>
          <H4>Make plans</H4>
          <p>No sign up necessary: just start searching local businesses and planning your night out on the town. Add emails or phone numbers for friends you want to invite.</p>
        </PreviewCard>

        <PreviewCard>
          <H4>Support local businesses</H4>
          <p>Loofti lets you and your friends buy gift cards and shop online now to help support the merchants you&rsquo;ve made plans with. You can subscribe to get weekly updates about your favorites.</p>
        </PreviewCard>

        <PreviewCard>
          <H4>That&rsquo;s it!</H4>
          <p>No sign up or account needed. See you out there when it&rsquo;s safe again!</p>
          <button type='button'>Get started</button>
        </PreviewCard>
      </StyledSlider>
      {
        (slide < 2) ? <HackySlideNav
          onClick={() => {
            setSlide(Math.min(slide+1, 2))
          }}>
          {'>'}
        </HackySlideNav> : <div></div>
      }
    </GalleryGrid>
  )
}



export default DemoGallery