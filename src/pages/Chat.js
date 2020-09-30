import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase"

export default class Chat extends Component {
    constructor() {
      // super(props);
      super()
      this.state = {
        user: auth().currentUser,
        chats: [],
       content:'',
        readError: null,
        writeError: null
      };

      this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange=(event)=> {
        this.setState({
          content: event.target.value
        });
      }

      async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
          await db.ref("drafts").push({
            content: this.state.content,
            url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
            timestamp: Date.now(),
            uid: this.state.user.uid
          });
          this.setState({ content: '' });
        } catch (error) {
          this.setState({ writeError: error.message });
        }
      }

    async componentDidMount() {
        this.setState({ readError: null });
        try {
          db.ref("drafts").on("value", snapshot => {
            let chats = [];
            console.log(snapshot.val())
            snapshot.forEach((snap) => {
              chats.push(snap.val());
            });
            this.setState({ chats });
          });
        } catch (error) {
          this.setState({ readError: error.message });
        }
      }


      render() {
        return (
            <div>
              <div className="chats">
                {this.state.chats.map(chat => {
                //   return (<p key={chat.timestamp}>{chat.content}</p>)

                return <img key={chat.timestamp} src={chat.url} />
                })}
              </div>
              
              <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={this.state.content}></input>
                {this.state.error ? <p>{this.state.writeError}</p> : null}
                <button type="submit">Send</button>
              </form>
              <div>
                Login in as: <strong>{this.state.user.email}</strong>
              </div>
            </div>
          );
      }
}