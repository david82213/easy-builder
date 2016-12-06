import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

  render (){
    const {
      handleSubmit,
      fields: {
        first_name,
        last_name,
        email,
        password,
        passwordConfirm
      }
    } = this.props
    return (
      <form>
        <fieldset className="form-group fl w-50">
          <label>First Name: </label>
          <input className="form-control" {...first_name} />
            {first_name.touched &&
              first_name.error &&
              <div className="gold">{first_name.error}</div>
            }
        </fieldset>

        <fieldset className="form-group fr w-50">
          <label>Last Name: </label>
          <input className="form-control" {...last_name} />
            {last_name.touched &&
              last_name.error &&
              <div className="gold">{last_name.error}</div>
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

        <button action="submit" className="btn btn-primary fl w-100">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps){
  const errors = {};
  // console.log(formProps);

  if (!formProps.first_name){
    errors.first_name = "Please enter first name"
  }

  if (!formProps.last_name){
    errors.last_name = "Please enter last name"
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

export default reduxForm({
  form: 'signup',
  fields: ['first_name', 'last_name', 'email', 'password', 'passwordConfirm'],
  validate: validate
})(Signup);
