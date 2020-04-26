import React from 'react'
import styled from 'styled-components'

const SelectedCity = ({ name, className }) => <div className={className}>
  Where to: <strong>{name}</strong>
</div>

const StyledSelectedCity = styled(SelectedCity)`
  width: calc(100% - 4rem);
  text-align: left;
  font-size: calc(1vw + 10px);
  color: white;
  background-color: #226afc;
  padding: 1rem 2rem;
  & > strong {
    font-size: calc(1vw + 12px);
  }
`

export default StyledSelectedCity