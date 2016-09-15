import React, { Component } from 'react';

class Message extends Component {
  constructor(props){
    super(props)
  }

  belongsToCurrentUser = () => {
    return this.props.currentUser === this.props.message.user
  }

  render() {
    content = `Here is the message: ${this.props.message.text}, ` +
              `at time: ${this.props.message.time}, from user: ${this.props.message.user}`
    return (
      <li key={this.props.key}>
        <h4 style={belongsToCurrentUser ? style.red : style.norm}>{content}</h4>
      </li>
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
      loadMore: false }
  }

  addMsg = (text, event) => {
    let currentMessages = this.state.messages
    let time = new Date().toTimeString()
    let user = this.state.currentUser
    let newMessage = {text, time, user}
    currentMessages.push(newMessage)
    this.setState({messages: currentMessages})
  }

  loadAll = (event) => {
    this.setState({loadMore: true})
  }

  render() {

    var messageMap = this.state.messages.map(function(message, i){
        return (<Message key={i} message={message} />)
    })

    return (
      <div className="messages">
        <ul> {messageMap} </ul>
        <button style={{marginLeft: '70%', hidden: this.state.messages.length > 3}}
          type="button" onClick={this.loadAll}>Load More</button>
        <label htmlfor='messageInput'>Insert Message:
          <input type = 'text' id= 'messageInput' ref='messageInput' placeholder='Your message here'/>
        </label>
        <input type = 'submit' value = 'Submit'/>

      </div>
    );
  }
}

class App extends Component {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        <MessageList />
      </p>
    </div>
  );
}

export default App;
