import React, { useEffect, useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import {  PlanDiv, PlanInput, SuggestionList } from './styled'
import CitySelectionMap from './CitySelectionMap'

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

  // homeSweetHome[0]
  const [center, setCenter] = useState({
    lat: 38.9613795,
    lng: -95.2604155
  })

  const [height, setHeight] = useState(
    document.documentElement.clientHeight
  )

  useEffect(() => {
    const handleHeightChange = () => {
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

  const setNewCenter = (newCenter) => {
    setCenter(newCenter)
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
      <CitySelectionMap
        center={center}
        handleCancel={() => { console.log('NO') }}
        handleConfirm={() => { console.log('YES')}}
        setNewCenter={setNewCenter}
      />
    </PlanDiv>
  )
}

export default Plan
