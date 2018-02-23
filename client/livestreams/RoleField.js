import React from 'react';
import PropTypes from 'prop-types';

const RoleField = ({record = {}}) => {
    let stt = record.status;
    if(stt == 0)
        stt = 'Unpublished'
    else if(stt == 1)
        stt = 'Upcoming'
    else
        stt = 'Live'
    return <span>{stt}</span>
};

RoleField.PropTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired
};

export default RoleField;