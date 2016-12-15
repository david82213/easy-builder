import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Footer from './footer';

// style this later
class Welcome extends Component{
  // <div classNameName="index-cover">
  //   {/* <video classNameName="video-container video-container-overlay" autoPlay="true" loop="true">
  //     <source src="public/videos/bg.mp4" type="video/mp4" style={style} />
  //   </video> */}
  //   <div classNameName="index-contents">
  //     Welcome to Easy Site Builder
  //   </div>
  // </div>
  renderLinks(){
    if (this.props.authenticated) {
      return (
        <div>
        <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/">Home</a>
        <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/signout">Sign Out</a>
        </div>
      );
    } else{
      return (
        <div>
        <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >Home</a>
        <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/signin" >Sign In</a>
        <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/signup" >Create a account</a>
        </div>
      );
    }
  }

  render(){
    return(
      <div>
      <header id="top-header" className="sans-serif">
        <div className="cover bg-left bg-center-l">
          <div className="fullscreen-bg">
              <video loop muted autoPlay className="fullscreen-bg__video">
                  <source src="public/videos/bg.mp4" type="video/mp4"/>
              </video>
          </div>
          <div className="bg-black-80 vh-100 pb5 pb6-m pb7-l">
            <nav className="dt w-100 mw8 center">
              <div className="dtc w2 v-mid pa3">
                <a href="/" className="dib h2 pa1 grow-large">
                  {/* <svg className="link white-90 hover-white" data-icon="skull" viewBox="0 0 32 32" style="fill:currentcolor"><title>skull icon</title><path d="M16 0 C6 0 2 4 2 14 L2 22 L6 24 L6 30 L26 30 L26 24 L30 22 L30 14 C30 4 26 0 16 0 M9 12 A4.5 4.5 0 0 1 9 21 A4.5 4.5 0 0 1 9 12 M23 12 A4.5 4.5 0 0 1 23 21 A4.5 4.5 0 0 1 23 12"></path></svg> */}
                  <svg className="svg-icon" viewBox="0 0 20 20">
      							<path fill="none" d="M8.652,16.404c-0.186,0-0.337,0.151-0.337,0.337v2.022c0,0.186,0.151,0.337,0.337,0.337s0.337-0.151,0.337-0.337v-2.022C8.989,16.555,8.838,16.404,8.652,16.404z"></path>
      							<path fill="none" d="M11.348,16.404c-0.186,0-0.337,0.151-0.337,0.337v2.022c0,0.186,0.151,0.337,0.337,0.337s0.337-0.151,0.337-0.337v-2.022C11.685,16.555,11.535,16.404,11.348,16.404z"></path>
      							<path fill="none" d="M17.415,5.281V4.607c0-2.224-1.847-4.045-4.103-4.045H10H6.687c-2.256,0-4.103,1.82-4.103,4.045v0.674H10H17.415z"></path>
      							<path fill="none" d="M18.089,10.674V7.304c0,0,0-0.674-0.674-0.674V5.955H10H2.585v0.674c-0.674,0-0.674,0.674-0.674,0.674v3.371c-0.855,0.379-1.348,1.084-1.348,2.022c0,1.253,2.009,3.008,2.009,3.371c0,2.022,1.398,3.371,3.436,3.371c0.746,0,1.43-0.236,1.98-0.627c-0.001-0.016-0.009-0.03-0.009-0.047v-2.022c0-0.372,0.303-0.674,0.674-0.674c0.301,0,0.547,0.201,0.633,0.474h0.041v-0.137c0-0.372,0.303-0.674,0.674-0.674s0.674,0.302,0.674,0.674v0.137h0.041c0.086-0.273,0.332-0.474,0.633-0.474c0.371,0,0.674,0.302,0.674,0.674v2.022c0,0.016-0.008,0.03-0.009,0.047c0.55,0.391,1.234,0.627,1.98,0.627c2.039,0,3.436-1.348,3.436-3.371c0-0.362,2.009-2.118,2.009-3.371C19.438,11.758,18.944,11.053,18.089,10.674z M5.618,18.089c-0.558,0-1.011-0.453-1.011-1.011s0.453-1.011,1.011-1.011s1.011,0.453,1.011,1.011S6.177,18.089,5.618,18.089z M6.629,13.371H5.474c-0.112,0-0.192-0.061-0.192-0.135c0-0.074,0.08-0.151,0.192-0.174l1.156-0.365V13.371z M8.652,12.521c-0.394,0.163-0.774,0.366-1.148,0.55c-0.061,0.03-0.132,0.052-0.2,0.076v-0.934c0.479-0.411,0.906-0.694,1.348-0.879V12.521z M5.281,10c-1.348,0-1.348-2.696-1.348-2.696h5.393C9.326,7.304,6.629,10,5.281,10z M10.674,12.296c-0.22-0.053-0.444-0.084-0.674-0.084s-0.454,0.032-0.674,0.084v-1.168C9.539,11.086,9.762,11.06,10,11.05c0.238,0.01,0.461,0.036,0.674,0.078V12.296z M12.696,13.146c-0.068-0.024-0.14-0.046-0.2-0.076c-0.374-0.184-0.754-0.386-1.148-0.55v-1.188c0.442,0.185,0.87,0.467,1.348,0.879V13.146zM14.382,18.089c-0.558,0-1.011-0.453-1.011-1.011s0.453-1.011,1.011-1.011c0.558,0,1.011,0.453,1.011,1.011S14.94,18.089,14.382,18.089z M13.371,13.371v-0.674l1.156,0.365c0.112,0.022,0.192,0.099,0.192,0.174c0,0.074-0.08,0.135-0.192,0.135H13.371z M14.719,10c-1.348,0-4.045-2.696-4.045-2.696h5.393C16.067,7.304,16.067,10,14.719,10z"></path>
      							<path fill="none" d="M10,16.067c-0.186,0-0.337,0.151-0.337,0.337V19.1c0,0.186,0.151,0.337,0.337,0.337s0.337-0.151,0.337-0.337v-2.696C10.337,16.218,10.186,16.067,10,16.067z"></path>
      						</svg>
                </a>
              </div>
              <div className="dtc v-mid tr pa3">
                {this.renderLinks()}
              </div>
            </nav>
            <div className="tc-l mt4 mt5-m mt6-l ph3">
              <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">Easy Site Builder</h1>
              <h2 className="fw1 f3 white-80 mt3 mb4">Where you can build sites without knowing any code</h2>
              <a className="f6 no-underline grow dib v-mid bg-grey white ba b--blue ph3 pv2 mb3 hover-white" href="/theme">Start Building</a>
              <span className="dib v-mid ph3 white-70 mb3">or</span>
              <a className="f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3 hover-silver" href="#about">Browse Around</a>
            </div>
          </div>
        </div>
      </header>

      <div id="about" className="cb bg-black light-blue">
        <article className="cf ph3 ph5-ns pv5">
          <header className="fn fl-ns w-50-ns pr4-ns">
            <h1 className="mb3 mt0 lh-title">About this Project</h1>
            <time className="f6 ttu tracked gray">Daniel Lin</time>
          </header>
          <div className="fn fl-ns w-50-ns">
            <p className="lh-copy measure mt4 mt0-ns">
              PERFECT typography is more a science than an art. Mastery of the trade is
              indispensable, but it isn't everything. Unerring taste, the hallmark of
              perfection, rests also upon a clear understanding of the laws of harmonious
              design. As a rule, impeccable taste springs partly from inborn sensitivity:
              from feeling. But feelings remain rather unproductive unless they can inspire a
              secure judgment. Feelings have to mature into knowledge about the consequences
              of formal decisions. For this reason, there are no born masters of typography,
              but self- education may lead in time to mastery.
            </p>
            <p className="lh-copy measure">
              It is wrong to say that there is no arguing about taste when it is good taste
              that is in question. We are not born with good taste, nor do we come into this
              world equipped with a real understanding of art. Merely to recognize who or
              what is represented in a picture has little to do with a real under- standing
              of art. Neither has an uninformed opinion about the proportions of Roman
              letters. In any case, arguing is senseless. He who wants to convince has to
              do a better job than others.
            </p>
          </div>
        </article>
      </div>

      <Footer />

      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Welcome);
