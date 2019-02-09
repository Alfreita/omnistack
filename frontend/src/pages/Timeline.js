import React, { Component } from 'react';
import api from '../services/api.js';
import socket from "socket.io-client";

import './Timeline.css'
import twitterLogo from '../twitter.svg';
import Tweet from "../components/Tweet";


export default class Timeline extends Component {

  state ={ 
    tweets : [],
    newTwitte: '',
  };

  async componentDidMount(){

    this.subscribeToEvents();

    const response = await api.get("tweets");

    this.setState({tweets: response.data});
  }


  subscribeToEvents = () =>{
    const io = socket("http://localhost:3000");

    io.on("tweet",data =>{
      this.setState({tweets : [data, ...this.state.tweets]});
    });

    io.on("like",data =>{
      this.setState({tweets: this.state.tweets.map(tweet => (
        tweet._id === data._id ? data : tweet)
        )});
    });
  }


  handleNewTwitte = async(e) =>{
    if(e.keyCode !== 13) return;

    const content = this.state.newTwitte;
    const author = localStorage.getItem("@GoTwitter:username");

    await api.post('tweets',{content,author});
  
    this.setState({newTwitte: ''});
  };

  handleInputChange = (e) =>{
    this.setState({newTwitte: e.target.value});
  };

  render() {
    return (
      <div className="timeline-wrapper">
      <img height={24} src={twitterLogo} alt="GoTwitter"/>
      <form >
        <textarea
          value = { this.state.newTwitte}
          onChange = {this.handleInputChange}
          onKeyDown={this.handleNewTwitte}
          placeholder="O que está acontecendo?"
        />
      </form>
        <ul className="tweet-list">
            {this.state.tweets.map(tweet => (
               <Tweet key={tweet._id} tweet={tweet}/>
             ))}
        </ul>
      </div>
    );
  }
}
