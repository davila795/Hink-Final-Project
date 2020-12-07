import ReactCountryFlag from "react-country-flag"
import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import countryList from 'react-select-country-list'

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = { country: '', region: '', code: '' };
    }

    selectCountry(val) {
        this.setState({ country: val });
    }

    selectRegion(val) {
        this.setState({ region: val });
    }

    getCountryCode(val) {
        this.setState({ code: countryList().getValue(val) })

    }

    render() {
        const { country, region } = this.state;
        return (
            <div>
                <CountryDropdown
                    value={country}
                    onChange={(val) => { this.selectCountry(val); this.getCountryCode(val) }} />
                <ReactCountryFlag countryCode={this.state.code || 'ES'} svg style={{ marginLeft: '10px' }} /><br /><br />
                <RegionDropdown
                    country="Spain"
                    value={region}
                    onChange={(val) => this.selectRegion(val)} />
            </div>
        );
    }
}

export default Example