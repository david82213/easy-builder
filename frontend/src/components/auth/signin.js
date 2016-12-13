import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

var style = {
  fill: 'currentColor'
};

class Signin extends Component {
  handleFormSubmit({email, password}) {
    // console.log(email, password);
    this.props.signinUser({email, password});
  }

  renderAlert(){
    if (this.props.errorMessage){
      return (
        // <div className="alert alert-danger">
        <div className="ba b--transparent ph4 mh0 mt3 yellow">
          {this.props.errorMessage}
        </div>
      )
    }
  }

  render (){
    const {
      // handleSubmit is from redux-form
      handleSubmit, fields: { email, password }
    } = this.props;

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
        {/* <fieldset className="form-group">
          <label>Email:</label>
          <input type="text" {...email} className="form-control" />
        </fieldset>

        <fieldset className="form-group">
          <label>Password:</label>
          <input type="password" {...password} className="form-control" />
        </fieldset> */}
        <legend className="white f4 fw6 ph0 mh0">Enter your credentials</legend>

        <fieldset className="ba b--transparent ph4 mh0">
          <div className="mt3">
            <label className="white db fw4 lh-copy f6" for="email">Email</label>
            {/* <input className="pa2 input-reset ba bg-transparent w-100 measure"
              name="email" type="email" {...email} /> */}
            <input className="w-100 b--white white pa2 input-reset ba bg-transparent hover-bg-black hover-white"
              name="email" type="email" {...email} />

          </div>
        </fieldset>

        <fieldset className="ba b--transparent ph4 mh0">
          <div className="mt3">
            <label className="white db fw4 lh-copy f6" for="password">Password</label>
            {/* <input className="pa2 input-reset ba bg-transparent"
              name="password" type="password" {...password} /> */}
            <input className="b--white white pa2 input-reset ba bg-transparent"
              name="password" type="password" {...password} />
          </div>
        </fieldset>

        {this.renderAlert()}

        {/* <fieldset className="form-group">
          <label>Email:</label>
          <Field type="email" name="email" component="input" className="form-control" />
        </fieldset>

        <fieldset className="form-group">
          <label>Password:</label>
          <Field type="password" name="password" component="input" className="form-control" />
        </fieldset> */}

        <div className="mt3 ph4">
          <input className="white b--white ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign In"/>
          <span className="white dib ml5 mr5">or</span>

          <a className="v-top white link near-black hover-silver dib mh3 tc" href="http://localhost:3000/auth/google" title="Google">
            <svg className="v-btm dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M179.7 237.6L179.7 284.2 256.7 284.2C253.6 304.2 233.4 342.9 179.7 342.9 133.4 342.9 95.6 304.4 95.6 257 95.6 209.6 133.4 171.1 179.7 171.1 206.1 171.1 223.7 182.4 233.8 192.1L270.6 156.6C247 134.4 216.4 121 179.7 121 104.7 121 44 181.8 44 257 44 332.2 104.7 393 179.7 393 258 393 310 337.8 310 260.1 310 251.2 309 244.4 307.9 237.6L179.7 237.6 179.7 237.6ZM468 236.7L429.3 236.7 429.3 198 390.7 198 390.7 236.7 352 236.7 352 275.3 390.7 275.3 390.7 314 429.3 314 429.3 275.3 468 275.3" fill-rule="nonzero"/></svg>
          </a>
          <a className="v-btm white link hover-silver dib mh3 tc" href="http://localhost:3000/auth/twitter" title="Twitter">
            <svg className="v-btm white dib h2 w2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M16 3.038c-.59.26-1.22.437-1.885.517.677-.407 1.198-1.05 1.443-1.816-.634.375-1.337.648-2.085.795-.598-.638-1.45-1.036-2.396-1.036-1.812 0-3.282 1.468-3.282 3.28 0 .258.03.51.085.75C5.152 5.39 2.733 4.084 1.114 2.1.83 2.583.67 3.147.67 3.75c0 1.14.58 2.143 1.46 2.732-.538-.017-1.045-.165-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22-.276.074-.566.114-.865.114-.21 0-.416-.02-.617-.058.418 1.304 1.63 2.253 3.067 2.28-1.124.88-2.54 1.404-4.077 1.404-.265 0-.526-.015-.783-.045 1.453.93 3.178 1.474 5.032 1.474 6.038 0 9.34-5 9.34-9.338 0-.143-.004-.284-.01-.425.64-.463 1.198-1.04 1.638-1.7z" fill-rule="nonzero"/></svg>

          </a>
        </div>

        <div className="bb b--white mt3 ph4"></div>
        {/* <button action="submit" className="btn btn-primary">Sign In</button> */}
        <div className="lh-copy mt3 ph4 mt4">
          <a href="/signup" className="white f6 link hover-silver db">Sign up</a>
        </div>
      </form>
    </main>
    )
  }
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
