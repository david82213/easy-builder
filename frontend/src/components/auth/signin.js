import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({email, password}) {
    // console.log(email, password);
    this.props.signinUser({email, password});
  }

  render (){
    const {
      // handleSubmit is from redux-form
      handleSubmit, fields: { email, password }
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input type="text" {...email} className="form-control" />
        </fieldset>

        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" {...password} className="form-control" />
        </fieldset>

        {/* <fieldset className="form-group">
          <label>Email:</label>
          <Field type="email" name="email" component="input" className="form-control" />
        </fieldset>

        <fieldset className="form-group">
          <label>Password:</label>
          <Field type="password" name="password" component="input" className="form-control" />
        </fieldset> */}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, null, actions)(Signin);
