import React, { useEffect, useRef, useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { ExpandingDiv, PlanDiv, PlanInput, SuggestionList } from './styled'
import CitySelectionMap from './CitySelectionMap'
import SelectedCity from './SelectedCity'

const homeSweetHome = {
  lat: 38.9613795,
  lng: -95.2604155
}

const Plan = (props) => {
  // Layout state/effects (big honkin workaround for insufficiency of vh-based
  // layout on mobile)
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
  }, [])

  // Form state (TODO: local storage persistence)
  const [citySelected, setCitySelected] = useState(null)
  const [friendsSelected, setFriendsSelected] = useState(null)
  const [placesSelected, setPlacesSelected] = useState(null)

  // Map state and effects
  const mapRef = useRef(null)
  const [infoVisible, setInfoVisible] = useState(null)
  const [center, setCenter] = useState(homeSweetHome)
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
  const geoService = useRef()
  useEffect(() => {
    const getClosestCity = () => {
      if (!geoService.current) {
        geoService.current = new window.google.maps.Geocoder
      }
      if (center == homeSweetHome) {
        return
      }
      geoService.current.geocode({
        location: center,
      }, (res) => {
        if (res?.length) {
          const closest = res[0]
          const city = closest.address_components.filter(
            ac => ac.types.includes('locality')
          )[0]?.long_name || 'Lawrence'
          const state = closest.address_components.filter(
            ac => ac.types.includes('administrative_area_level_1')
          )[0]?.short_name || 'KS'
          const nation = closest.address_components.filter(
            ac => ac.types.includes('country')
          )[0]?.long_name || 'USA'
          geoService.current.geocode({
            address: `${city}, ${state}, ${nation}`,
          }, (res) => {
            if (res?.length) {
              const localities = res.filter(
                r => r.types.includes('locality')
              )
              if (localities.length) {
                setValue(
                  localities[0].formatted_address,
                  false
                )
              }
            }
          })
        }
      })
    }
    getClosestCity()
  }, [center])

  // Map handlers
  const handleToggleInfoVisibility = (isVisible) => {
    setInfoVisible(isVisible)
  }

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
        setInfoVisible(true)
      }).catch(error => {
        console.log('Error geolocating: ', error)
      })
  }

  const handleConfirm = () => {
    setCitySelected({
      displayName: value,
      center,
    })
  }

  const setNewCenter = (newCenter) => {
    setCenter(newCenter)
  }

  // Render helpers
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
      {!citySelected && <>
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
          {status === 'OK' && <SuggestionList>
            {renderSuggestions()}
          </SuggestionList>}
        </div>
        <CitySelectionMap
          center={center}
          handleConfirm={handleConfirm}
          setNewCenter={setNewCenter}
          infoVisible={infoVisible}
          setInfoVisible={handleToggleInfoVisibility}
        />
      </> ||
      <SelectedCity name={citySelected.displayName} />}
      <ExpandingDiv>
        <label htmlFor='friends'>Who's invited?</label>
        <br />
        <PlanInput id='friends'></PlanInput>
      </ExpandingDiv>
    </PlanDiv>
  )
}

export default Plan
