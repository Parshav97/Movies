import React, { Component } from 'react'
import { movies } from './getMovies'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Movies extends Component {
  constructor(){
    super()
    this.state ={
      hover:'',
      parr:[1],
      currPage:1,
      movies:movies.results,
      favourites:[]
    }
  }
  async componentDidMount(){
    const res = await axios.get(``)
    let data = res.data
    // console.log(data)
    this.setState({
      movies:[...data.results]
    })
    console.log("Mounting Done")
  }

  changeMovies = async () => {
    const res = await axios.get(``)
    let data = res.data
    // console.log(data)
    this.setState({
      movies:[...data.results]
    })
  }

  handleRight = ()=>{
    let temparr = []
    for(let i = 1; i<=this.state.parr.length + 1;i++){
      temparr.push(i)
    }
    // setState is an asynchronus function thus i am providing 
    // FUNCTION DEFINITION not a function call to be executed 
    // only after setState changes have been implemented
    this.setState({
      parr:[...temparr],
      currPage:this.state.currPage+1
    }, this.changeMovies)
   
  }

  handleLeft = ()=>{
    if(this.state.currPage!==1){
      this.setState({
        currPage:this.state.currPage-1
      },this.changeMovies)
    }
  }

  handleClick = (value) =>{
    if(value!==this.state.currPage){
      this.setState({
          currPage:value
      }, this.changeMovies)
    }
  }
  handleFavourites = (movieObject)=> {
    let oldData = JSON.parse(localStorage.getItem('movies-app')||"[]")
    if(this.state.favourites.includes(movieObject.id)){
      oldData = oldData.filter((m)=>m.id!=movieObject.id)
    }else{
      oldData.push(movieObject)
    }
    localStorage.setItem("movies-app",JSON.stringify(oldData))
    console.log(oldData)
    this.handleFavouritesState(); 
  }
  handleFavouritesState=()=>{
    let oldData = JSON.parse(localStorage.getItem('movies-app')||"[]")
    let temp = oldData.map((movie)=>movie.id)
    this.setState({
      favourites:[...temp]
    })
  }

  render() {
    // console.log("Render")
    // let movie = movies.results
    return (
      <>
        {
          this.state.movies.length === 0 ?
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> :
            <div>
              <h3 className="text-center">
                <strong> Trending</strong>
              </h3>
              <div className='movies-list'>
                {
                  this.state.movies.map((movieObject,index) => {
                    return <div key={index} className="card movies-card" onMouseEnter={()=>this.setState({hover:movieObject.id})} onMouseLeave={()=>this.setState({hover:''})}>
                      <img src={`https://image.tmdb.org/t/p/original${movieObject.backdrop_path}`} className="card-img-top movies-img" alt={movieObject.title} />
                      {/* <div className="card-body"> */}
                      <h5 className="card-title movies-title">{movieObject.original_title}</h5>
                      {/* <p className="card-text movies-text">{movieObject.overview}</p> */}
                      <div className="button-wrapper" style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                       {
                         this.state.hover === movieObject.id &&
                        <a href="#" className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObject)} >{this.state.favourites.includes(movieObject.id)?"Remove From Favourites":"Add To Favourites"}</a>

                       }
                      </div>
                      {/* </div> */}
                    </div>
                  })
                }
              </div>
              <div style={{display:'flex',justifyContent:'center'}}>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                  <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>

                    {
                      this.state.parr.map((value, index)=>(
                        <li key={index} className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>

                      ))
                    }
                    <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                  </ul>
                </nav>
              </div>


            </div>
        }

      </>
    )
  }
}
