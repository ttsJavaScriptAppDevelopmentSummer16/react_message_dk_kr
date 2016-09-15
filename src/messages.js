import React, { Component } from 'react';

class Message extends Component {
  render() {
    let content = `Here is the message: ${this.props.message.text}, ` +
              `at time: ${this.props.message.time}, from user: ${this.props.message.user}`
    return (
      <li key={this.props.key}>
        <h4 style={this.props.style}>{content}</h4>
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
      messages: [ {text:"This is message 1",time:"1:00AM",user:"Toki"},
                  {text:"This is message 2",time:"2:00AM",user:"William"},
                  {text:"This is message 3",time:"3:00AM",user:"Nathan"} ],
      currentUser: "Toki",
      loadMore: false,
      newMessage: null
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
      this.setState({messages, newMessage: null})
    }
    else {
      alert('Please Enter A Message')
    }
  }

  loadSwitch = (e) => {
    let currentLoad = this.state.loadMore
    this.setState({loadMore: !currentLoad})
  }

  belongsToCurrentUser = (message) => {
    return (this.state.currentUser === message.user)
  }

  render() {

    let messageMap = this.state.messages.map(function(message, i){
      let message_style = belongsToCurrentUser(message) ? style.red : style.norm
      return (<Message key={i} message={message} style={message_style}/>)
    })

    messageMap = this.state.loadMore ? messageMap : messageMap.slice(0,3)

    return (
      <div className="messages">
        <ul> {messageMap} </ul>
        <LoadButton func={this.loadSwitch} val={this.state.loadMore} />
        <form onSubmit={this.addMessage}>
          <label htmlFor='messageInput'>Message Input</label>
          <input type='text' name='messageInput' value={this.state.newMessage} onChange={this.updateMessage} id='messageInput'/><br />
          <button type="submit" className='primary'>Add Message</button>
        </form>
      </div>
    );
  }
}

export default MessageList;
