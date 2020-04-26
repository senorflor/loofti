import styled from 'styled-components'

export const PlanDiv = styled.div`
  margin-top: 64px;
  height: ${({ height }) => height - 64}px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const ExpandingDiv = styled.div`
  flex: 1;
  width: 100%;
  border-top: 1px solid #999;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({color}) => color || '#fcea22'};
`

export const PlanInput = styled.input`
  width: 300px;
  max-width: 90%;
  border: none;
`

export const PlanLabel = styled.label`

`

export const SuggestionList = styled.ul`
  position: absolute;
  z-index: 100;
  width: 298px;
  max-width: 89%
  margin: 0;
  padding: 0.2em;
  text-align: left;
  background: white;
  list-style: none;
  &:hover {
    cursor: pointer;
  }
`

export const EmojiButton = styled.button`
  padding: 0.35rem;
`
