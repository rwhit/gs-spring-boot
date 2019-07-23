import React from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { clearMessage } from '../actions/index';
const mapStateToProps = state => {
  return { message: state.message, type: state.messageType };
};

function mapDispatchToProps(dispatch) {
  return {
    clearMessage: () => dispatch(clearMessage())
  }
}

class WrappedMessage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event) {
    event.preventDefault();
    console.log('handleClose');
    this.props.clearMessage();
    console.log('after clearMessage');
  }
  render() {
    console.log("render: message is " + this.props.message);
    if (this.props.message != null) {
      return (
        <Modal isOpen={true} size="sm">
            <ModalHeader>
                { this.props.type }
            </ModalHeader>
            <ModalBody>
                { this.props.message }
            </ModalBody>
            <ModalFooter>
                <Button onClick={this.handleClose}>OK</Button>
            </ModalFooter>
        </Modal>
      );
    } else {
      return null;
    }
  }

}

const Message = connect(mapStateToProps, mapDispatchToProps)(WrappedMessage);

export default Message;
