import React, { Component } from 'react';
import api from '../services/api.js';

import './Timeline.css'
import twitterLogo from '../twitter.svg';


export default class Timeline extends Component {

  state ={ 
    newTwitte: '',
  };

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
      <ul>

      </ul>
      </div>
    );
  }
}
