import React, { useEffect, useState } from 'react'
import { Map } from 'google-maps-react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { EmojiButton, PlanDiv, PlanInput, SuggestionList } from './styled'
import InfoWindow from './InfoWindow'

const mapStyles = {
  position: 'relative',
  marginTop: '1rem',
  width: '80vw',
  height: '60vh',
}

// Jankily ensure we don't end up in an update loop of map position because the
// InfoWindow overflows to keep pushing map center out in very small screens
// (e.g. mobile browser when keyboard pops). TODO(senorflor): better responsive
// layout handling :)
const updateTimestamps = (timestamps, now) => {
  return timestamps.filter(
    ts => Math.abs(now - ts) < 1000
  ).concat(now)
}

const MapContainer = ({
  center,
  handleCancel,
  handleConfirm,
  setNewCenter,
}) => {
  const [recentMoveTimestamps, setTimestamps]  = useState([])
  const handleMapMoved = (_, theMap) => {
    const { lat: oldLat, lng: oldLng } = center
    const newCenter = {
      lat: theMap.center.lat(),
      lng: theMap.center.lng(),
    }
    if (oldLat != newCenter.lat || oldLng != newCenter.lng) {
      setTimestamps(
        updateTimestamps(recentMoveTimestamps, Date.now())
      )
      if (recentMoveTimestamps.length < 2) {
        setNewCenter(newCenter)
      }
    }
  }
  return (
    <Map
      google={window.google}
      initialCenter={center}
      center={center}
      containerStyle={mapStyles}
      mapTypeControl={false}
      streetViewControl={false}
      onIdle={handleMapMoved}> 
        <InfoWindow visible={true} position={center}>
          <>
          <EmojiButton type='button' onClick={handleCancel}>❌ Cancel</EmojiButton> 
          <EmojiButton type='button' onClick={handleConfirm}>✅ Let's go!</EmojiButton>
          </>
        </InfoWindow>
    </Map>
  )
}

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
      <MapContainer
        center={center}
        handleCancel={() => { console.log('NO') }}
        handleConfirm={() => { console.log('YES')}}
        setNewCenter={setNewCenter}
      />
    </PlanDiv>
  )
}

export default Plan
