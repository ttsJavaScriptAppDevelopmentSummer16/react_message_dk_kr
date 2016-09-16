import React, { Component } from 'react';

class Message extends Component {
  render() {
    let content = `${this.props.message.text}, ` +
              `from user: ${this.props.message.user}`
    return (
      <li>
        <h4 style={{color: this.props.style}}>{content}</h4>
      </li>
    )
  }
}

class LoadButton extends Component {
  render() {
    let text = this.props.val ? "Load Less" : "Load More"
    return (
      <button style={{marginLeft: '70%'}}
        type="button" onClick={this.props.func}>{text}</button>
    )
  }
}

class MessageList extends Component {

  constructor() {
    super()
    this.state = {
      messages: [ {text:"This is message 1",time:"1:00AM",user:"Skwisgelf"},
                  {text:"This is message 2",time:"1:00AM",user:"Taller"},
                  {text:"This is message 3",time:"1:00AM",user:"Than A"},
                  {text:"This is message 4",time:"2:00AM",user:"Tree"},
                  {text:"This is message 5",time:"1:00AM",user:"Toki"},
                  {text:"This is message 6",time:"1:00AM",user:"Wartooth"},
                  {text:"This is message 7",time:"1:00AM",user:"Bumblebee"},
                  {text:"This is message 8",time:"2:00AM",user:"William"},
                  {text:"This is message 9",time:"2:00AM",user:"Murderface"},
                  {text:"This is message 10",time:"2:00AM",user:"Murderface"},
                  {text:"This is message 11",time:"2:00AM",user:"Murderface"},
                  {text:"This is message 12",time:"3:00AM",user:"Nathan"},
                  {text:"This is message 13",time:"3:00AM",user:"Explosion"} ],
      currentUser: "Murderface",
      loadMore: false,
      newMessage: ''
    }
  }

  updateMessage = (e) => {
    this.setState({newMessage: e.target.value})
  }

  // editMessage = () => {
  //   this.setState({editMessage: true})
  // }

  addMessage = (e) => {
    e.preventDefault();
    if (!!this.state.newMessage) {
      let messages = this.state.messages.slice()
      let content = this.state.newMessage
      let timestamp = new Date().toTimeString()
      messages.push({text: content, time: timestamp, user: this.state.currentUser})
      this.setState({messages, newMessage: ''})
    }
    else {
      alert('Please Enter A Message')
    }
  }

  loadSwitch = (e) => {
    let currentLoad = this.state.loadMore
    this.setState({loadMore: !currentLoad})
  }

  render() {

    const currentUser = this.state.currentUser

    let messageMap = this.state.messages.map(function(message, i){
      let message_style = (currentUser === message.user) ? 'red' : 'black'
      return (<Message key={i} message={message} style={message_style}/>)
    })

    messageMap = this.state.loadMore ? messageMap : messageMap.slice(0,3)

    return (
      <div className="messages">
        <LoadButton func={this.loadSwitch} val={this.state.loadMore} />
        <ul> {messageMap} </ul>
        <form onSubmit={this.addMessage}>
          <label htmlFor='messageInput'>Message Input</label><br/>
          <input type='text' name='messageInput' value={this.state.newMessage} onChange={this.updateMessage} id='messageInput'/><br />
          <button type="submit" className='primary'>Add Message</button>
        </form>
      </div>
    );
  }
}

export default MessageList;
