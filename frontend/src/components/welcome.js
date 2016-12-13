import React from 'react';
import Header from './header';
import Footer from './footer';

// style this later
export default () =>
  // <div classNameName="index-cover">
  //   {/* <video classNameName="video-container video-container-overlay" autoPlay="true" loop="true">
  //     <source src="public/videos/bg.mp4" type="video/mp4" style={style} />
  //   </video> */}
  //   <div classNameName="index-contents">
  //     Welcome to Easy Site Builder
  //   </div>
  // </div>
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
            <a href="/" className="dib w2 h2 pa1 ba b--white-90 grow-large border-box">
              {/* <svg className="link white-90 hover-white" data-icon="skull" viewBox="0 0 32 32" style="fill:currentcolor"><title>skull icon</title><path d="M16 0 C6 0 2 4 2 14 L2 22 L6 24 L6 30 L26 30 L26 24 L30 22 L30 14 C30 4 26 0 16 0 M9 12 A4.5 4.5 0 0 1 9 21 A4.5 4.5 0 0 1 9 12 M23 12 A4.5 4.5 0 0 1 23 21 A4.5 4.5 0 0 1 23 12"></path></svg> */}
            </a>
          </div>
          <div className="dtc v-mid tr pa3">
            <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >Home</a>
            <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/signin" >Sign In</a>
            <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/signup" >Create a account</a>
          </div>
        </nav>
        <div className="tc-l mt4 mt5-m mt6-l ph3">
          <h1 className="f2 f1-l fw2 white-90 mb0 lh-title">Easy Site Builder</h1>
          <h2 className="fw1 f3 white-80 mt3 mb4">Where you can build sites without knowing any code</h2>
          <a className="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3 hover-white" href="/theme">Start Building</a>
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
