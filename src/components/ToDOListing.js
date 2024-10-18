import React, { Component } from 'react'

export class ToDOListing extends Component {
  constructor(props) {
    super(props)
    this.inputRef =  React.createRef();
    this.state = {
            todoList: [{   id: 1,name:'make Tea'},
                {   id: 2,name:'wake up  Tea'}],
            editId: null
        }

  }
 addClickHandler = ()=>{
    this.setState((prev)=>({
        todoList: [...prev.todoList, {name: this.inputRef.current.value, id: Math.random()}]
    }));
    
  }
  editTodoHandler = (id)=>{
    console.log(id)
    this.setState({
        editId: id
    })
  }
  updateTodoHandler = (id)=>{
    this.setState({
        editId: null
    })
  }

  handleDone = (id)=>{
    this.setState(
        (prev)=>({
            todoList: prev.todoList.filter(item=> item.id!== id)
            
        }
        
    )
    );
  }
  change= (event, id)=>{
    event.stopPropagation();
    this.setState(
        (prev)=>({
            todoList: [...prev.todoList.map(item => item.id === id ? {id: item.id, name: event.target.value } : item)]
            
        }
        
    )
    );
  }
  render() {
    console.log(this.state.todoList);
    return (
      <React.Fragment>
        <h2>TO DO APP</h2>
        <input type="text"  ref={this.inputRef}/>
        <button onClick={this.addClickHandler}>ADD</button>
    
            <ul>
            {this.state.todoList.map( (item) => 
                (
                <li key={item.id}>
                     {this.state.editId === item.id ? <input type="text" value={item.name} onChange={(event)=>{this.change(event,item.id)}}/> : item.name}
                      {this.state.editId===item.id ?<button onClick={(event)=>{this.updateTodoHandler(item.id)}}>Update</button> :<button onClick={(event)=>{this.editTodoHandler(item.id)}}>Edit</button>}
                       <button onClick= {()=>{this.handleDone(item.id)}}>Done</button>
                </li>
            ))}
            </ul>
      </React.Fragment>
    )
  }
}

export default ToDOListing