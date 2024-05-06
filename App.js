import React from "react";
import axios from 'axios';

class App extends React.Component{



constructor(props)
{
  super(props);
  this.state=
  {
    users:[],
    name:'',
    email:'',
    password:'',
    id:0
    }
  }
  componentDidMount(){
    axios.get('http://localhost:5000/')
    .then((res)=>
      this.setState({
        users:res.data,
        name:'',
        role:'',
        password:'',
        id:0
      })
    )
    

  }
  namechange = event => {
    this.setState({
      name:event.target.value
    })
  }
  rolechange = event => {
    this.setState({
      role:event.target.value
    })
  }
  passwordchange = event => {
    this.setState({
      password:event.target.value
    })
  }
  submit(event,id){
    event.preventDefault()
    if(id===0){
      axios.post('http://localhost:5000',{"name":this.state.name,"role":this.state.role,"password":this.state.password})
      .then(()=>{
        this.componentDidMount();
      })
    }else{
      axios.put(`http://localhost:5000${id}`,{"name":this.state.name,"role":this.state.role,"password":this.state.password})
      .then(()=>{
        this.componentDidMount();
      })
    }
  }
  delete(id){
    axios.delete(`http://localhost:5000/${id}`)
    .then(()=>{
      this.componentDidMount();
    })
  }

  getone(id){
    axios.put(`http://localhost:5000/getone/${id}`)
    .then((res)=>{
      console.log(res.data)
      this.setState({
        name:res.data.name,
        role:res.data.role,
        id:res.data._ID,
        passsowrd:res.data.password
      })
    })
  }
  
  render(){

  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col lg-6 mt-5">
        <form  onSubmit={(e)=>{this.submit(e,this.state.id)}}>
        <div className="form-group"> 
        <input type='text' onChange={(e)=>{this.namechange(e)}} className="form-control" placeholder="Username" value ={this.state.name} />
        </div>
        <div className="form-group"> 
        <input type="role" onChange={(e)=>{this.emailchange(e)}} className="form-control" placeholder="Role" value={this.state.role} />
        </div>
        <div className="form-group"> 
        <input type="password" onChange={(e)=>{this.passwordchange(e)}} className="form-control" placeholder="Password" value={this.state.password} />
        </div>
        <button className="btn btn-block btn-primary">Submit</button>
        </form>
        </div>
        <div className="col lg-6">
          <table className="table">
            <thead>
              <th>Name</th>
              <th>Role</th>
              <th>Password</th>
              <th>Edit</th>
              <th>Delete</th>
            </thead>
            <tbody>


              {this.state.users.map(user=>
                <tr>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.password}</td>
                <td>
                  <button onClick={(e)=>this.getone(user._ID)} className="btn btn-sm btn-primary">
                    <i className="fa fa-pencil"></i>
                  </button>
                </td>
                <td>
                  <button onClick={(e)=>this.delete(user._ID)} className="btn btn-sm btn-danger">
                    <i className="fa fa-trash"> </i>
                  </button>
                </td>
              </tr>
              )}
              



            </tbody>
          </table>
        </div>

      </div>
    
    </div>
  );
}
}

export default App;
