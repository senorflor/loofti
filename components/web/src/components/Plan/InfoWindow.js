import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { InfoWindow } from 'google-maps-react'

// This wrapper allows the InfoWindow to pass event handlers and other callbacks
// into its children; the original component does not!
const ResponsibleParentInfoWindow = (props) => {
  const infoWindowRef = React.createRef();
  const contentElement = document.createElement(`div`);
  useEffect(() => {
    ReactDOM.render(React.Children.only(props.children), contentElement);
    infoWindowRef.current.infowindow.setContent(contentElement);
  }, [props.children]);
  return <InfoWindow ref={infoWindowRef} {...props} />;
}

export default ResponsibleParentInfoWindow