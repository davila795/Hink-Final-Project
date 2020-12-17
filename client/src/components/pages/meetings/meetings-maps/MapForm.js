import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps"
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode"
import './MapForm.css'

Geocode.setApiKey(process.env.REACT_APP_GOOGLEMAPS_API);
Geocode.enableDebug();

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            mapPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            },
            markerPosition: {
                lat: this.props.center.lat,
                lng: this.props.center.lng
            }
        }
    }
    /**
      * Get the current address from the default map position and set those values in the state
      */
    componentDidMount() {
        console.log(this.state.mapPosition.lat)
        Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray)
                this.setState({
                    address: (address) ? address : '',
                    city: (city) ? city : '',
                })
            },
            error => {
                console.error(error);
            }
        );
    };
    /**
      * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
      *
      * @param nextProps
      * @param nextState
      * @return {boolean}
      */
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.markerPosition.lat !== this.props.center.lat ||
            this.state.address !== nextState.address ||
            this.state.city !== nextState.city
        ) {
            return true
        } else if (this.props.center.lat === nextProps.center.lat) {
            return false
        }
    }
    /**
      * Get the city and set the city input value to the one selected
      *
      * @param addressArray
      * @return {string}
      */
    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    /**
      * When the marker is dragged you get the lat and long using the functions available from event object.
      * Use geocode to get the address, city, area and state from the lat and lng positions.
      * And then set those values in the state.
      *
      * @param event
      */
    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng(),
            addressArray = [];
        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray);
                this.setState({
                    address: (address) ? address : '',
                    city: (city) ? city : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    }
                })
                this.props.handleLocation(newLat, newLng, address, city)
            },
            error => {
                console.error(error);
            }
        );
    };

    /**
 * When the user types an address in the search box
 * @param place
 */
    onPlaceSelected = (place) => {
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();

        this.setState({
            address: (address) ? address : '',
            city: (city) ? city : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            }
        })
        this.props.handleLocation(latValue, lngValue, address, city)
    };


    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                () => (
                    <GoogleMap google={this.props.google}
                        defaultZoom={this.props.zoom}
                        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >
                        {/* For Auto complete Search Box */}
                        <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '30px'
                            }}
                            onPlaceSelected={place => this.onPlaceSelected(place)}
                            types={['(regions)']}
                            componentRestrictions={{ country: "es" }}
                        />

                        {/* InfoWindow on top of marker */}
                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
                        >
                            <div>
                                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                            </div>
                        </InfoWindow>

                        {/*Marker*/}
                        <Marker google={this.props.google}
                            name={'Dolores park'}
                            draggable={true}
                            onDragEnd={this.onMarkerDragEnd}
                            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                        />
                        <Marker />
                    </GoogleMap>
                )
            )
        );
        let map;
        {
            this.props.center.lat
                ?
                map = <div>
                    <div className="form-group">
                        <label htmlFor="">City</label>
                        <input type="text" name="city" className="form-control" readOnly="readOnly" value={this.state.city} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Address</label>
                        <input type="text" name="address" className="form-control" readOnly="readOnly" value={this.state.address} />
                    </div>

                    <AsyncMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAPS_API}&libraries=places`}
                        loadingElement={
                            <div style={{ height: `100%` }} />
                        }
                        containerElement={
                            <div style={{ height: '100%' }} />
                        }
                        mapElement={
                            <div style={{ height: this.props.height }} />
                        }
                    />
                </div>
                :
                map = <div style={{ height: this.props.height }} />
        }
        return (map)
    }
}
export default Map