import React from 'react';
import PropTypes from 'prop-types';
import Reset from '../components/Reset';

const ResetPage = props => {
  const { query } = props;
  return <Reset resetToken={query.resetToken} />;
};

ResetPage.propTypes = {
  query: PropTypes.shape({
    resetToken: PropTypes.string,
  }).isRequired,
};

export default ResetPage;
