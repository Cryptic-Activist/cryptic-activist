import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../components/Layout'

const App = () => {
  // const user = useSelector((state) => state.user);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 col-md-10 col-sm-10 col-12">
            <h1>Bootstrap is workig on homepage</h1>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-12">
            <h1>Col-2</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App
