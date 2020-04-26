import React from 'react'
import styled from 'styled-components'

const SelectedFriends = ({ friends, handleClick, className }) =>
  <div onClick={handleClick} className={className}>
    Who's invited: <strong>{`You + ${friends.length || '??'} friends`}</strong>
  </div>

const StyledSelectedFriends = styled(SelectedFriends)`
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

export default StyledSelectedFriends