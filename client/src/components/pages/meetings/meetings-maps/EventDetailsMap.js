import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps"
import Geocode from "react-geocode"

Geocode.setApiKey(`${process.env.REACT_APP_GOOGLEMAPS_API}`);
Geocode.enableDebug();

const EventMap = (props) => {
    console.log(props)
    const AsyncMap = withScriptjs(
        withGoogleMap(
            () => (
                <GoogleMap google={props.google}
                    defaultZoom={props.zoom}
                    defaultCenter={{ lat: props.coordinates[0], lng: props.coordinates[1] }}
                >
                    {/* InfoWindow on top of marker */}
                    <InfoWindow
                        position={{ lat: (props.coordinates[0] + 0.0018), lng: props.coordinates[1] }}
                    >
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>{props.address}</span>
                        </div>
                    </InfoWindow>

                    {/*Marker*/}
                    <Marker google={props.google}
                        name={'Dolores park'}
                        position={{ lat: props.coordinates[0], lng: props.coordinates[1] }}
                    />
                    <Marker />
                </GoogleMap>
            )
        )
    );
    let map;
    {
        props.coordinates
            ?
            map =
            <AsyncMap
                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_GOOGLEMAPS_API + "&libraries=places"}
                loadingElement={
                    < div style={{ height: `100%` }
                    } />
                }
                containerElement={
                    < div style={{ height: props.height, margin: '20px 0' }} />
                }
                mapElement={
                    < div style={{ height: `100%` }} />
                }
            />
            :
            map = <div style={{ height: props.height }} />
    }
    return (map)
}

export default EventMap
