import React, { PureComponent } from 'react'
import {nanoid} from 'nanoid'
import './index.css'

export default class List extends PureComponent {
  state = {
    listInfo: [],
    currentText: '',
    mouseIndex: -1,
    checkNum: 0,
    checkAll: false
  }
  render() {
    return (
      <div className="list">
        <div className="list-input">
          <input type="text" value={this.state.currentText}
          onKeyDown={this.addData}
          onChange={this.inputChange}/>
        </div>
        <div className="list-content" style={{display: this.state.listInfo.length ? 'block' : 'none'}}
        onMouseLeave={()=> this.setState({mouseIndex: -1})}>
          {
            this.state.listInfo.map((item, index)=> {
              return (
                <label key={item.id} onMouseEnter={this.mouseEnter(index)}>
                  <li>
                    <input type="checkbox" name={item.text} id={item.id} checked={item.checked}
                     onChange={this.itemChange(index)}/>
                    {item.text}
                  </li>
                  <span className="delete-btn" onClick={this.deleteList(index)} style={{display: this.state.mouseIndex === index ? 'block' : 'none'}}>delete</span>
                </label>
              )
            })
          }
        </div>
        <div className="list-count">
          <input type="checkbox" name="" id="" checked={this.state.checkAll} onChange={this.checkAll}/>
          <span>已选 {this.state.checkNum}/{this.state.listInfo.length}</span>
        </div>
      </div>
    )
  }

  addData = (e)=> {
    if (e.code === "Enter" && this.state.currentText) {
      const list = JSON.parse(JSON.stringify(this.state.listInfo));

      list.unshift({
        id: nanoid(),
        text: this.state.currentText,
        checked: false
      });

      this.setState({
        listInfo: list,
        currentText: ''
      })
    }
  }

  inputChange = (e)=> {
    this.setState({
      currentText: e.target.value
    })
  }

  deleteList = index => {
    return () => {
      const list = JSON.parse(JSON.stringify(this.state.listInfo));
      list.splice(index, 1);

      this.setState({
        listInfo: list
      });

      setTimeout(()=> {
        this.updateCheckedCount();
      });
    }
  }

  itemChange = index => {
    return e => {
      const _checked = !this.state.listInfo[index].checked;
      const list = JSON.parse(JSON.stringify(this.state.listInfo));
      
      list[index].checked = _checked;
      this.setState({
        listInfo: list
      });
      setTimeout(()=> {
        this.updateCheckedCount();
      });
    }
  }

  mouseEnter = index => {
    return e => {
      this.setState({
        mouseIndex: index
      })
    }
  }

  updateCheckedCount = () => {
    const num = this.state.listInfo.filter(item => item.checked).length;
    let checkAll = num === this.state.listInfo.length;

    if (!this.state.listInfo.length) {
      checkAll = false;
    }

    this.setState({
      checkNum: num,
      checkAll: checkAll
    });
  }

  checkAll = () => {
    const list = this.state.listInfo.map(item=> {
      item.checked = !this.state.checkAll;
      return item;
    })
    this.setState({
      listInfo: list,
      checkAll: !this.state.checkAll
    });
    setTimeout(()=> {
      this.updateCheckedCount();
    });
  }
}
