import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'


function MyComponent(props) {
  const [count, setCount] = useState(0);

   // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  // 向myComponent组件传state
  return state;
}

function mapDispatchToProps() {
  // 向myComponent组件传方法
  return {
    add: ()=> {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)

