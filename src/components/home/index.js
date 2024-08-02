import {Component} from "react";

import Cookies from "js-cookie";

import {Redirect,Link} from "react-router-dom";

import Offcanvas from 'react-bootstrap/Offcanvas';

import { GoSearch } from "react-icons/go";

import { RiTodoLine } from "react-icons/ri";

import { GiHamburgerMenu } from "react-icons/gi";

import "./index.css"

class Home extends Component {

        state={editId:"",showEdits:false,editTitle:"",editDescription:"",title:"",description:"",todos:[],show:false,searchInput:"",showAllTodos:false}

        componentDidMount(){
            this.fetchAllTodos();
        }

        fetchAllTodos=async()=>{

           
            const userData=JSON.parse(localStorage.getItem("user"));
            console.log("usersData",userData.id)
          

            const url=`https://clawenterprisesbackendtododaveed.onrender.com/todos/${userData.id}`

           const response=await fetch(url);
           if(response.ok){

             const data=await response.json();

             console.log("loginTime",localStorage.getItem("loginTime"))

             const filteredSearch=data.filter(todo=>todo.title.toLowerCase().includes(this.state.searchInput.toLowerCase()))
             this.setState({todos:filteredSearch})
           }


        }

    handleClose = () => this.handleShow(false);
    handleShow = (show) => this.setState({show});
    handleSearchChange=(e)=>{
        this.setState({searchInput:e.target.value})
    }

    addItem=()=>{

        this.setState({showAllTodos:true})

    }

    cancelAddTodo = ()=>{
        this.setState({showAllTodos:false})
    }
   
    titleChange=(e)=>{
        this.setState({title:e.target.value})
    }
    textAreaChange=(e)=>{
        this.setState({description:e.target.value})
    }
    
    addItemForm = async(event)=>{
        event.preventDefault();
        const url="https://clawenterprisesbackendtododaveed.onrender.com/todos"
        const {title, description}=this.state

        
        const userData=JSON.parse(localStorage.getItem("user"));
        console.log("usersData",userData.id)

           console.log("adding item to userId",userData.id);

        const data={title:title,
            description:description,
            user_id:userData.id
        }

        const requestOptions={
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }

        const response=await fetch(url,requestOptions)
        if(response.ok){
            console.log("Todo added successfully");
            this.setState({title:"",description:"",showAllTodos:false},()=>{
                this.fetchAllTodos()
            })
            


        }
        else{
            console.log("Failed to add todo");
        }
         
         

      




    }

    deleteItem=async(id)=>{
        const url=`https://clawenterprisesbackendtododaveed.onrender.com/todos/${id}`

        const response=await fetch(url,{method:"DELETE"})
        if(response.ok){
            console.log("Todo deleted successfully");
            this.fetchAllTodos()
        }
        else{
            console.log("Failed to delete todo");
        }
       


    }

    updateItemSend=async(e)=>{
        e.preventDefault();
        const {editId,editTitle,editDescription}=this.state
        console.log("editId",editId)
    

            const url=`https://clawenterprisesbackendtododaveed.onrender.com/todos/${editId}`
            const data={
                title:editTitle,
                description:editDescription
            }
            const requestOptions={
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
            const response=await fetch(url,requestOptions)
            if(response.ok){
                console.log("Todo updated successfully");
            
                this.setState({showEdits:false,editTitle:"",editDescription:"",editId:""},()=>{
                    this.fetchAllTodos()
                })
            }
            else{
                console.log("Failed to update todo");
            }

    }

    updateItem=(item)=>{
        console.log("item:",item);
        this.setState({editId:item.id,editTitle:item.title,editDescription:item.description,showAllTodos:false,showEdits:true});


    }

    editTitleChange=(event)=>{
        this.setState({editTitle:event.target.value})
    }
    editTextAreaChange=(event)=>{
        this.setState({editDescription:event.target.value})
    }


    userInputSearch=(event)=>{
      
      this.setState({searchInput:event.target.value},()=>{
        this.fetchAllTodos()
      })
    }

    searchButton=()=>{
     
      this.fetchAllTodos()
    }
    render() {
        const{showEdits,editTitle,editDescription,title,description,todos,show,searchInput,showAllTodos}=this.state
        const jwtToken = Cookies.get("jwtToken");
        if(jwtToken===undefined){
            return <Redirect to="/login" />
        }

        return (
            <div>
           
                <div className="nav-bar">
                <div>
                <button type="button"  className="hamburg-menu" onClick={this.handleShow}>
                <GiHamburgerMenu />
                </button>

      <Offcanvas show={show} onHide={this.handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
          <div className='show-only-on-larger-screen'>
                <img className='keep-logo' src="https://i.ibb.co/10TvKXC/paper-14203821.png" alt="blog-logo-not-found"/>
                <span className="keep-title">Todos</span>
                

               </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
                <div>
                    <h3>Welcome to Todos</h3>
                   <p>create a todos</p>
                   <p></p>
                    
                    
                </div>
         
              
                <div className='notes-add-button-container'>
                 
                    <div className='icon'>
                    <RiTodoLine />
                    </div>
                    <div className='button'>
                    <button onClick={this.addItem} className="notes-all-add-button">Add a Note</button>
                    </div>
                  
                  
                </div>
                 





        </Offcanvas.Body>
      </Offcanvas>
                </div>

              

                <div className='search-bar-container'>
                    <button onClick={this.searchButton} className="search-button"><GoSearch /></button>
                    <input value={searchInput} onChange={this.userInputSearch}  type="search" placeholder="Search" className="search-bar" />
                </div>
              

                <div>
                    <Link to ="/profile">
                    <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=740&t=st=1721325896~exp=1721326496~hmac=9b0e0ed6d5328d0f0ad3f74f17048bdca4736e9f69a0d125db1f586a93cb79f9" alt="image-user-not-found" className="user-image" />
                    </Link>
                </div>

                </div>


        {showAllTodos===false && <div className="all-notes-container">
              <div className="todos-container">
                    
                        {todos.length>0?

                    
                           
                           
                                todos.map((each)=><div className="each-todo" key={each.id}>
                                <h3>{each.title}</h3>
                              
                                <p>{each.description}</p>
                                
                                <div>
                                <button className="btn btn-primary" onClick={()=>this.updateItem(each)}>Edit</button>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <button className="btn btn-danger" onClick={()=>this.deleteItem(each.id)}>Delete</button>
                                </div>
                                                 </div>)

                               
                            
                            :  
                            
                            <div className="no-todo-found-container">
                                <div>
                                <h3>No Todos Found</h3>
                                <p>No todos found in your list</p>
                                <img src="https://img.freepik.com/free-vector/work-life-balance-concept-illustration_114360-8897.jpg?t=st=1722526776~exp=1722530376~hmac=3171a049a17b4887e3e7e3043af5665719903884dc154e39b565749f81506e09&w=740" className="no-todo-found" alt="no-todo-found" />
                                </div>
                            </div>

                        
                         }

              </div>
        </div>}  



        { showAllTodos===true && 
              <div className="form-container">
                
                <form className="form-box" onSubmit={this.addItemForm}>
                    <input onChange={this.titleChange} value={title} type="text" placeholder="Title" name="title" required />
                   
                    <textarea onChange={this.textAreaChange} value={description} className="textarea" placeholder="Description" name="description" required />
                    <div>
                    <button type="submit" className="btn btn-primary">Add Todo</button>
                    &nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.cancelAddTodo}>Cancel</button>
                    </div>
                </form>
               

              </div>

        }


        {
            showEdits===true &&
              <div className="form-container">
                
                <form className="form-box" onSubmit={this.updateItemSend}>
                    <input onChange={this.editTitleChange} value={editTitle} type="text" placeholder="Title" name="title" required />
                   
                    <textarea onChange={this.editTextAreaChange} value={editDescription} className="textarea" placeholder="Description" name="description" required />
                    <div>
                    <button type="submit" className="btn btn-primary">Update Todo</button>
                    &nbsp;&nbsp;
                    <button type="button" className="btn btn-danger" onClick={()=>this.setState({showEdits:false})}>Cancel</button>
                    </div>
                </form>

            </div>


        }






                <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossOrigin="anonymous"
/>
            </div>
        )
    }

}

export default Home;