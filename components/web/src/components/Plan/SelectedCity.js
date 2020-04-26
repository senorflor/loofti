import React from 'react'
import styled from 'styled-components'

const SelectedCity = ({ city, handleClick, className }) =>
  <div onClick={handleClick} className={className}>
    Where to: <strong>{city ? city.displayName : '??'}</strong>
  </div>

const StyledSelectedCity = styled(SelectedCity)`
  width: calc(100%);
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

export default StyledSelectedCity