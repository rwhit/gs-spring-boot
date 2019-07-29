import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

const mapStateToProps = state => {
  return { showSpinner: state.fetching }
}

const WrappedSpinner = props => {
  if (props.showSpinner)
    return (<Spinner className="view-centered-spinner" />)
  else
    return null;
}

export default connect(mapStateToProps)(WrappedSpinner)
