import React from 'react'
import styled from 'styled-components'

const SelectedPlaces = ({ places, handleClick, className }) =>
  <div onClick={handleClick} className={className}>
    We're visiting: <strong>{`${places.length || '??'} places`}</strong>
  </div>

const StyledSelectedPlaces = styled(SelectedPlaces)`
  width: 100%;
  text-align: left;
  font-size: calc(1vw + 10px);
  border-top: 1px solid #999;
  box-sizing: border-box;
  padding: 1rem 2rem;
  & > strong {
    font-size: calc(1vw + 12px);
  }
  &:hover {
    cursor: pointer;
  }
`

export default StyledSelectedPlaces