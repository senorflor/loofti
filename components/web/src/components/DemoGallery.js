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
`

const StyledSlider = styled(Slider)`
  max-width: 450px;
`

const PreviewCard = styled.div`
  height: 300px;
  background: #ccc;
  padding: 1.5rem;
  & > p {
    text-align: left;
  }
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
          <h4>Make plans</h4>
          <p>No sign up necessary: just start searching local businesses and planning your night out on the town. Add emails or phone numbers for friends you want to invite.</p>
        </PreviewCard>

        <PreviewCard>
          <h4>Support local businesses</h4>
          <p>Loofti lets you and your friends buy gift cards and shop online now to help support the merchants you&rsquo;ve made plans with. You can subscribe to hear weekly updates about your favorites, and if they're not online yet, you can even make small donations to help get them there!</p>
        </PreviewCard>

        <PreviewCard>
          <h4>That&rsquo;s it!</h4>
          <p>No sign up or account needed. See you out there when it&rsquo;s safe again!</p>
          <button>Make plans &amp; help out</button>
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