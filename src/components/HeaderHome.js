import React from "react";
import PropTypes from "prop-types";

const HeaderHome = ({ header }) => (
    <div>
        <h1 className='mb-0'><strong>{ header.title }</strong></h1>
        <span className='lead f-14'>{ header.subtitle }</span>
    </div>
);

HeaderHome.propTypes = {
    header: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
    }),
};

HeaderHome.defaultProps = {
    header: {
        title: 'Titulo de referencia',
        subtitle: 'SubTitulo de referencia',
    },
};


export default HeaderHome;