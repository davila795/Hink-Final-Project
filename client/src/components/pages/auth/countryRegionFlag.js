import ReactCountryFlag from "react-country-flag"
import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import countryList from 'react-select-country-list'

class CountrySelection extends Component {
    constructor(props) {
        super(props);
        this.state = { country: '', city: '', code: '' };
    }

    selectCountry = val => {
        this.setState({ country: val });
    }

    selectCity = val => {
        this.setState({ city: val });
        this.props.setCountryCity({ country: this.state.country, city: val })
    }

    getCountryCode(val) {
        this.setState({ code: countryList().getValue(val) })

    }

    render() {
        const { country, city } = this.state;
        return (
            <div>
                <CountryDropdown
                    value={country}
                    onChange={(val) => { this.selectCountry(val); this.getCountryCode(val) }} />
                <ReactCountryFlag countryCode={this.state.code || 'ES'} svg style={{ marginLeft: '10px' }} /><br /><br />
                <RegionDropdown
                    country="Spain"
                    value={city}
                    onChange={(val) => this.selectCity(val)} />
            </div>
        );
    }
}

export default CountrySelection