import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

var style = {
  fill: 'currentColor'
};

class Signup extends Component {
  handleFormSubmit(formProps){
    this.props.signUpUser(formProps);
  }

  renderAlert(){
    if (this.props.errorMessage){
      return (
        // <div className="alert alert-danger fl w-100">
        <div className="ba b--transparent ph4 mh0 mt3 yellow">
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
      <main className="pa4 black-80">
        <a href="/" className="f5 no-underline white bg-animate hover-bg-silver hover-white inline-flex items-center pa3 ba border-box mr4">
            <svg className="w1" data-icon="chevronLeft" viewBox="0 0 32 32" style={style}>
              <title>chevronLeft icon</title>
              <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
            </svg>
          <span className="pl1">Back</span>
        </a>
      <form className="mt5 measure center" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {/* <fieldset className="form-group fl w-50">
          <label>First Name: </label>
          <input className="form-control ttc" {...firstName} />
            {firstName.touched &&
              firstName.error &&
              <div className="gold">{firstName.error}</div>
            }
        </fieldset> */}

        {/* <fieldset className="form-group fr w-50">
          <label>Last Name: </label>
          <input className="form-control ttc" {...lastName} />
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
        </fieldset> */}
        <legend className="white f4 fw6 ph0 mh0">Enter your information</legend>

        <fieldset className="ba b--transparent ph4 mh0">
          <div className="mt3">
            {/* <label className="db fw4 lh-copy f6" for="firstName">First Name</label> */}
            <label className="white db fw4 lh-copy f6" htmlFor="firstName">First Name</label>
            {/* <input className="pa2 input-reset ba bg-transparent w-100 measure ttc"
              name="firstName" {...firstName} /> */}
            <input className="w-100 b--white white pa2 input-reset ba bg-transparent hover-bg-black hover-white ttc"
              name="firstName" {...firstName} />
              {firstName.touched &&
                firstName.error &&
                <div className="light-blue">{firstName.error}</div>
              }
          </div>
        </fieldset>

        <fieldset className="ba b--transparent ph4 mh0">
          <div className="mt3">
            <label className="white db fw4 lh-copy f6" htmlFor="lastName">Last Name</label>
            <input className="w-100 b--white white pa2 input-reset ba bg-transparent w-100 measure ttc"
              name="lastName" {...lastName} />
            {lastName.touched &&
                lastName.error &&
                <div className="light-blue">{lastName.error}</div>
              }
          </div>
        </fieldset>

        <fieldset className="ba b--transparent ph4 mh0">
          <div className="mt3">
            <label className="white db fw4 lh-copy f6" htmlFor="email">Email</label>
            <input className="w-100 b--white white pa2 input-reset ba bg-transparent w-100 measure"
              name="email" type="email" {...email} />
              {email.touched &&
                email.error &&
                <div className="light-blue">{email.error}</div>
              }
          </div>
        </fieldset>

        <fieldset className="ba b--transparent ph4 mh0">
          <div className="mt3">
            <label className="white db fw4 lh-copy f6" htmlFor="password">Password</label>
            <input className="b--white white pa2 input-reset ba bg-transparent"
              name="password" type="password" {...password} />
              {password.touched &&
                password.error &&
                <div className="light-blue">{password.error}</div>
              }
          </div>
        </fieldset>

        <fieldset className="ba b--transparent ph4 mh0">
          <div className="mt3">
            <label className="white db fw4 lh-copy f6" htmlFor="passwordConfirm">Password Confirmation</label>
            <input className="b--white white pa2 input-reset ba bg-transparent"
              name="passwordConfirm" type="password" {...passwordConfirm} />
              {passwordConfirm.touched &&
                passwordConfirm.error &&
                <div className="light-blue">{passwordConfirm.error}</div>
              }
          </div>
        </fieldset>



        {this.renderAlert()}
        <div className="mt3 ph4">
          <input className="white b--white b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign Up"/>
        </div>
        {/* <button action="submit" className="btn btn-primary fl w-100">Sign Up</button> */}

        <div className="bb b--white mt3 ph4"></div>
        <div className="lh-copy mt3 ph4 mt4">
          <a href="/signin" className="white f6 link hover-silver db">Already have account? Sign In!</a>
        </div>
      </form>
    </main>
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
