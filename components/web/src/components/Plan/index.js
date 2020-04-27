import React, { useEffect, useRef, useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { ExpandingDiv, PlanDiv, PlanInput, PlanLabel, SuggestionList } from './styled'
import CitySelectionMap from './CitySelectionMap'
import PlacesSelectionMap from './PlacesSelectionMap'
import PlanStepSummary from './PlanStepSummary'

const homeSweetHome = {
  lat: 38.9613795,
  lng: -95.2604155
}

const Plan = (props) => {
  // Layout state/effects (big honkin workaround for insufficiency of vh-based
  // layout on mobile for this particular layout impl [calc'd non-100% because
  // header])
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

  // City map state and effects (TODO: extract into wrapper hook)
  const [infoVisible, setInfoVisible] = useState(null)
  const [cityCenter, setCityCenter] = useState(homeSweetHome)
  const [placesCenter, setPlacesCenter] = useState(homeSweetHome)
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
      if (cityCenter == homeSweetHome) {
        return
      }
      geoService.current.geocode({
        location: cityCenter,
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
  }, [cityCenter])

  // City Map handlers
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
        setCityCenter(coords)
        setInfoVisible(true)
      }).catch(error => {
        console.log('Error geolocating: ', error)
      })
  }

  const handleCityConfirm = () => {
    setCitySelected({
      displayName: value,
      cityCenter,
    })
    setPlacesCenter(cityCenter) // Update Places map center for convenience
    setSelectionPhase('friends')
  }

  const setNewCityCenter = (newCenter) => {
    setCityCenter(newCenter)
  }

  // Places map state and effects
  const {
    ready: placesReady,
    value: placesValue,
    suggestions: { status: placesStatus, data: placesData },
    setValue: setPlacesValue,
    clearSuggestions: clearPlacesSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: [
        '(cities)'
      ]
    },
    debounce: 333,
  })

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
          center={cityCenter}
          handleConfirm={handleCityConfirm}
          setNewCenter={setNewCityCenter}
          infoVisible={infoVisible}
          setInfoVisible={handleToggleInfoVisibility}
        />
      </ExpandingDiv> : <PlanStepSummary
        caption='Where to: '
        content={citySelected?.displayName && `${citySelected.displayName}\xa0\xa0✅`}
        handleClick={() => {setSelectionPhase('city')}}
      />}
      {(selectionPhase === 'friends') ? <ExpandingDiv>
        <PlanLabel htmlFor='friends'>Who's invited?</PlanLabel>
        <br />
        <fieldset id='friends'>
          {friendsSelected?.length ?
            friendsSelected.map((f, i) =>
              <React.Fragment key={f.name + f.contact}>
                <PlanLabel htmlFor={`name${i}`}>Name</PlanLabel>
                <input type='text' id={`name${i}`}></input>
                <PlanLabel htmlFor={`contact${i}`}>Email or Phone #</PlanLabel>
                <input type='text' id={`contact${i}`}></input>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <PlanLabel htmlFor='name1'>Name</PlanLabel>
                <input type='text' id='name1'></input>
                <PlanLabel htmlFor='contact1'>Email or Phone #</PlanLabel>
                <input type='text' id='contact1'></input>
              </React.Fragment>
            )}
        </fieldset>
        <button type='button' onClick={() => setSelectionPhase('places')}>💙</button>
      </ExpandingDiv> : <PlanStepSummary
        caption="Who's invited: "
        content={friendsSelected?.length && `You + ${friendsSelected.length} friends\xa0\xa0✅`}
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
        <PlacesSelectionMap
          center={placesCenter}
          handleConfirm={handleCityConfirm}
          setNewCenter={setNewCityCenter}
          infoVisible={infoVisible}
          setInfoVisible={handleToggleInfoVisibility}
        />
      </ExpandingDiv> : <PlanStepSummary
        caption="We're visiting: "
        content={placesSelected?.length && `${placesSelected.length} places\xa0\xa0✅`}
        handleClick={() => {setSelectionPhase('places')}}
      />}
    </PlanDiv>
  )
}

export default Plan
