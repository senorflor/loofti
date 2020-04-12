import React, { useRef } from 'react'
import styled from 'styled-components'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'

const mapStyles = {
  width: '80%',
  height: '80%',
}

const PlanDiv = styled.div`
  margin-top: 64px;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const MapWrap = styled.div`
`

const Plan = (props) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  })
  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false)
    clearSuggestions()

    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Result coordinates: ', { lat, lng })
      }).catch(error => {
        console.log('Error geolocating: ', error)
      })
  }
  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <li
          key={id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })
  return (
    <PlanDiv>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where will your trip start?"
      />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}

    </PlanDiv>
  )
}

export default Plan