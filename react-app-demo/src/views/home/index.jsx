import React, { PureComponent, lazy, Suspense } from 'react'
import axios from 'axios'
import { Link, Route, Routes } from 'react-router-dom'
import { Button } from 'antd';
import store from '../../redux/store';
import MyComponent from '../../components/myComponent/index';

const News = lazy(() => import('./news/index'))
const Messages = lazy(() => import('./messages/index'))

export default class Home extends PureComponent {
  render() {
    store.subscribe(()=> {
      console.log(store.getState())
    })
    return (
      <div>
    <Button type="primary" onClick={this.getReduxStata}>redux</Button><Button>Default Button</Button>
        <Link replace to={'/home/news'} state={{id: 1}}>news</Link>&nbsp;
        <Link replace to={'/home/messages'}>messages</Link>&nbsp;
        <Link replace to={'/list'}>list</Link>&nbsp;
        <MyComponent></MyComponent>
        <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={'/news'} element={<News/>}></Route>
            <Route path={'/messages'} element={<Messages/>}></Route>
          </Routes>
          </Suspense>
        </div>
      </div>
    )
  }
  getData = () => {
    axios.get('/api2').then(res=> {
      console.log(res)
    })
  }
  getReduxStata = () => {
    console.log('xx')
    store.dispatch({
      type: 'get',
      data: ''
    });
    
  }
}
