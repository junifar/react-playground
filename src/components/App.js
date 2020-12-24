import React, { Component } from "react";
import axios from 'axios';

class App extends Component {

  state = {
    ping: [],
    login: [],
    adminList: [],
    adminDropdownList: [],
  }

  componentDidMount(){

    axios.defaults.withCredentials = true

    const headerFormData = {
      'Content-Type':'multipart/form-data'
    }

    const formDataLogin = new FormData();
    formDataLogin.append('email', '[ISI EMAIL]');
    formDataLogin.append('password', '[ISI PASSWORD]');

    axios.get(`http://localhost:9004/ping`)
      .then(res => {
        const ping = res.data;
        this.setState({ ping });
        // console.log(res.data)
        });

    axios.post('http://localhost:9004/internal/v1/login', formDataLogin,
        {
          headers: headerFormData,
          // withCredentials: true
        }
    ).then(
    res => {
      const login = res.data;
      this.setState({ login })
    });

    axios.get('http://localhost:9004/internal/v1/admins', {
      params: {
        limit: 10,
        page:1,
      }
    },
    {
      headers: headerFormData,
      // withCredentials: true,
    }).then(
    res => {
      const adminList = res.data;
      this.setState({ adminList })
    });

    axios.get('http://localhost:9004/internal/v1/admins/dropdown', null,
    {
      headers: headerFormData,
      // withCredentials: true,
    }).then(
    res => {
      const adminDropdownList = res.data;
      this.setState({ adminDropdownList })
    });

  }

  render(){
    return(
      <div>
        <h1>Contoh ping : "http://localhost:9004/ping"</h1>
        <pre>
          { JSON.stringify(this.state.ping, null, 2) }
        </pre>
        <h1>Contoh login : "http://localhost:9004/internal/v1/login"</h1>
        <pre>
          { JSON.stringify(this.state.login, null, 2) }
        </pre>
        <h1>Contoh admin list : "http://localhost:9004/internal/v1/admins"</h1>
        <pre>
          { JSON.stringify(this.state.adminList, null, 2) }
        </pre>
        <h1>Contoh admin dropdown list : "http://localhost:9004/internal/v1/admins/dropdown"</h1>
        <pre>
          { JSON.stringify(this.state.adminDropdownList, null, 2) }
        </pre>
      </div>
    );
  } 
}

export default App;
