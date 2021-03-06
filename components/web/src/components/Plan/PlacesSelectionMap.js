import React, { useState } from 'react'
import { Map } from 'google-maps-react'
import { EmojiButton } from './styled'
import InfoWindow from './InfoWindow'

const mapStyles = {
  flex: 1,
  position: 'relative',
  marginTop: '1rem',
  width: '80vw',
  maxHeight: '60vh',
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

const PlacesSelectionMap = ({
  center,
  handleConfirm,
  setNewCenter,
  infoVisible,
  setInfoVisible,
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
        setInfoVisible(true)
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
      onIdle={handleMapMoved}
      zoom={16}>
        <InfoWindow visible={infoVisible} position={center}>
          <>
            <EmojiButton
              type='button'
              onClick={() => setInfoVisible(false)}>
              ❌ Cancel
            </EmojiButton>
            <EmojiButton
              type='button'
              onClick={handleConfirm}>
              ✅ Let's go!
            </EmojiButton>
          </>
        </InfoWindow>
    </Map>
  )
}

export default PlacesSelectionMap