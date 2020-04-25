import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Map } from 'google-maps-react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'

const mapStyles = {
  position: 'relative',
  marginTop: '1rem',
  width: '80vw',
  height: '60vh',
}

const PlanDiv = styled.div`
  margin-top: 64px;
  height: ${({ height }) => height - 64}px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const PlanInput = styled.input`
  width: 300px;
  max-width: 90%;
  border: none;
`

const MapContainer = (props) => {
  return (
    <Map
      google={window.google}
      initialCenter={props.center}
      center={props.center}
      containerStyle={mapStyles}
      mapTypeControl={false}
      streetViewControl={false}>
    </Map>
  )
}

const SuggestionList = styled.ul`
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

const Plan = (props) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: [
        '(cities)'
      ]
    },
    debounce: 333,
  })

  const [center, setCenter] = useState({
    lat: 38.9613795,
    lng: -95.2604155
  })

  const [height, setHeight] = useState(
    document.documentElement.clientHeight
  )

  useEffect(() => {
    const handleHeightChange = () => {
      console.log(document.documentElement.clientHeight)
      setHeight(document.documentElement.clientHeight)
    }
    window.addEventListener('resize', handleHeightChange)
    window.addEventListener('orientationchange', handleHeightChange)
    return () => {
      window.removeEventListener('resize', handleHeightChange)
      window.removeEventListener('orientationchange', handleHeightChange)
    }
  }

  )

  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false)
    clearSuggestions()

    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then((coords) => {
        setCenter(coords)
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
    <PlanDiv height={height}>
      <label htmlFor='destination'>Where to when we can get out again?</label>
      <br />
      
      <div>
        <PlanInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="I'll visit..."
          id='destination'
        />
        {status === 'OK' && <SuggestionList>{renderSuggestions()}</SuggestionList>}
      </div>
      <MapContainer center={center}/>
    </PlanDiv>
  )
}

export default Plan
