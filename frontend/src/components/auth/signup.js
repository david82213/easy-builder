import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formProps){
    this.props.signUpUser(formProps);
  }

  renderAlert(){
    if (this.props.errorMessage){
      return (
        <div className="alert alert-danger fl w-100">
          {this.props.errorMessage}
        </div>
      )
    }
  }

  render (){
    const {
      handleSubmit,
      fields: {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm
      }
    } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group fl w-50">
          <label>First Name: </label>
          <input className="form-control" {...firstName} />
            {firstName.touched &&
              firstName.error &&
              <div className="gold">{firstName.error}</div>
            }
        </fieldset>

        <fieldset className="form-group fr w-50">
          <label>Last Name: </label>
          <input className="form-control" {...lastName} />
            {lastName.touched &&
              lastName.error &&
              <div className="gold">{lastName.error}</div>
            }
        </fieldset>

        <fieldset className="form-group fl w-100">
          <label>Email: </label>
          <input type="email" className="form-control" {...email} />
            {email.touched &&
              email.error &&
              <div className="gold">{email.error}</div>
            }
        </fieldset>

        <fieldset className="form-group fl w-100">
          <label>Password: </label>
          <input type="password" className="form-control" {...password} />
          {/* if all 3 are true, return the last one */}
          {/* if password field is clicked out and contains an error */}
          {password.touched &&
            password.error &&
            <div className="gold">{password.error}</div>
          }
        </fieldset>

        <fieldset className="form-group fl w-100">
          <label>Password Confirmation: </label>
          <input type="password" className="form-control" {...passwordConfirm} />
            {passwordConfirm.touched &&
              passwordConfirm.error &&
              <div className="gold">{passwordConfirm.error}</div>
            }
        </fieldset>

        {this.renderAlert()}
        <button action="submit" className="btn btn-primary fl w-100">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps){
  const errors = {};
  // console.log(formProps);

  if (!formProps.firstName){
    errors.firstName = "Please enter first name"
  }

  if (!formProps.lastName){
    errors.lastName = "Please enter last name"
  }

  if (!formProps.email){
    errors.email = "Please enter email"
  }

  if (!formProps.password){
    errors.password = "Please enter password"
  }

  if (!formProps.passwordConfirm){
    errors.passwordConfirm = "Please enter password confirmation"
  }

  if (formProps.password !== formProps.passwordConfirm){
    errors.password = "Passwords do not match";
  }

  return errors;
}

function mapStateToProps(state){
  return {
    errorMessage: state.auth.error
  };
}

export default reduxForm({
  form: 'signup',
  fields: ['firstName', 'lastName', 'email', 'password', 'passwordConfirm'],
  validate: validate
}, mapStateToProps, actions)(Signup);
