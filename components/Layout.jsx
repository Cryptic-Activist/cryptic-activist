import React from 'react'
import Head from 'next/head'
import { Provider } from 'react-redux';

import Navbar from './UI/Navbar/Navbar'
import Footer from './UI/Footer/Footer'

import store from '../store';

const layoutStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%"
};

const contentStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column"
};

const Layout = (props) => (
  <div className="Layout" style={layoutStyle}>
    <Head>
      <title>Cryptic Activist</title>
      <meta
        name="description"
        content="A place where the technology meets freedom."
      />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
        rel="stylesheet"
      />
      <link 
        rel="stylesheet" 
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_CA" />
      <meta property="og:locale:alternate" content="es_GB" />
      <meta property="og:site_name" content="Cryptic Activist" />
      <meta property="og:description" content="Meta description" />
      <meta property="og:title" content="Cryptic Activist" />
      {/* <meta property="og:url" content={`https://crypticactivist.com${location.pathname}`} /> */}
      <meta property="og:type" content="article" />
      <meta name="twitter:site" content="Cryptic Activist" />
      <meta name="twitter:title" content="Cryptic Activist" />
      <meta name="twitter:description" content="A place where the technology meets freedom." />
      <meta name="twitter:card" content="article" />
    </Head>

    <Provider store={store}>
      <Navbar />
        {props.children}
      <Footer />
    </Provider>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      html,
      body,
      #__next {
        height: 100%;
        width: 100%;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: "Montserrat";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .Layout {

      }

      .Content {

      }

      @keyframes showSideDrawer {
        0% {
          transform: translateX(-250px);
          box-shadow: 1px 6px 6px 1px rgba(0,0,0,0);
        }
        100% {
          transform: translateX(0px);
          box-shadow: 1px 6px 6px 1px rgba(0,0,0,0.2);
        }
      }

      @keyframes showBackgroundSideDrawer {
        0% {
          background: rgba(0, 0, 0, 0);
        }
        100% {
          background: rgba(0, 0, 0, .2);
        }
      }

      @keyframes hideSideDrawer {
        0% {
          transform: translateX(0px);
          box-shadow: 1px 6px 6px 1px rgba(0,0,0,0.2);
        }
        100% {
          transform: translateX(-250px);
          box-shadow: 1px 6px 6px 1px rgba(0,0,0,0);
        }
      }

      @keyframes hideBackgroundSideDrawer {
        0% {
          background: rgba(0, 0, 0, .2);
          display: block!important;
        }
        100% {
          background: rgba(0, 0, 0, 0);
          display: none!important;
        }
      }

      .showSideDrawer {
        animation: showSideDrawer 0.25s ease-in-out;
        animation-fill-mode: forwards;  
      }

      .showBackgroundSideDrawer {
        display: block!important;
        animation: showBackgroundSideDrawer 0.25s ease-in-out;
        animation-fill-mode: forwards;  
      }

      .hideSideDrawer {
        animation: hideSideDrawer 0.25s ease-in-out;
        animation-fill-mode: forwards;  
      }

      .hideBackgroundSideDrawer {
        animation: hideBackgroundSideDrawer 0.25s ease-in-out;
        animation-fill-mode: forwards;  
      }
    `}</style>
    <script
      src="https://unpkg.com/react/umd/react.production.min.js"
      crossOrigin="true"
    />
    <script
      src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
      crossOrigin="true"
    />
    <script
      src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
      crossOrigin="true"
    />
    <script type="javascript">var Alert = ReactBootstrap.Alert;</script>
  </div>
)

export default Layout
