import React from 'react'
import styled from 'styled-components'

const PlanStepSummary = ({
  caption,
  content,
  handleClick,
  className, // for styled-components wrapper to apply
}) =>
  <div onClick={handleClick} className={className}>
    {caption}: <strong>{content || '??'}</strong>
  </div>

const StyledPlanStepSummary = styled(PlanStepSummary)`
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

export default StyledPlanStepSummary