import React, { useEffect, useRef, useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { ExpandingDiv, PlanDiv, PlanInput, PlanLabel, SuggestionList } from './styled'
import CitySelectionMap from './CitySelectionMap'
import PlanStepSummary from './PlanStepSummary'

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
  const [friendsSelected, setFriendsSelected] = useState([])
  const [placesSelected, setPlacesSelected] = useState([])
  const [selectionPhase, setSelectionPhase] = useState('city')

  // City map state and effects
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

  const handleCityConfirm = () => {
    setCitySelected({
      displayName: value,
      center,
    })
    setSelectionPhase('friends')
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
      {(selectionPhase === 'city') ? <ExpandingDiv>
        <PlanLabel htmlFor='city'>Where to when we can get out again?</PlanLabel>
        <br />
        <div>
          <PlanInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="I'll visit..."
            id='city'
          />
          {status === 'OK' && <SuggestionList>
            {renderSuggestions()}
          </SuggestionList>}
        </div>
        <CitySelectionMap
          center={center}
          handleConfirm={handleCityConfirm}
          setNewCenter={setNewCenter}
          infoVisible={infoVisible}
          setInfoVisible={handleToggleInfoVisibility}
        />
      </ExpandingDiv> : <PlanStepSummary
        caption='Where to: '
        content={citySelected?.displayName}
        handleClick={() => {setSelectionPhase('city')}}
      />}
      {(selectionPhase === 'friends') ? <ExpandingDiv>
        <PlanLabel htmlFor='friends'>Who's invited?</PlanLabel>
        <br />
        <PlanInput id='friends'></PlanInput>
        <button type='button' onClick={() => setSelectionPhase('places')}>💙</button>
      </ExpandingDiv> : <PlanStepSummary
        caption="Who's invited: "
        content={friendsSelected?.length && `You + ${friendsSelected.length} friends`}
        handleClick={() => { setSelectionPhase('friends') }}
      />}
      {(selectionPhase === 'places') ? <ExpandingDiv>
        <PlanLabel htmlFor='places'>What places will you visit?</PlanLabel>
        <br />
        <div>
          <PlanInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="We'll head to..."
            id='places'
          />
          {status === 'OK' && <SuggestionList>
            {renderSuggestions()}
          </SuggestionList>}
        </div>
        <CitySelectionMap
          center={center}
          handleConfirm={handleCityConfirm}
          setNewCenter={setNewCenter}
          infoVisible={infoVisible}
          setInfoVisible={handleToggleInfoVisibility}
        />
      </ExpandingDiv> : <PlanStepSummary
        caption="We're visiting: "
        content={placesSelected?.length && `${placesSelected.length} places`}
        handleClick={() => {setSelectionPhase('places')}}
      />}
    </PlanDiv>
  )
}

export default Plan
