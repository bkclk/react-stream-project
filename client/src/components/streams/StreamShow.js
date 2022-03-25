import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import {fetchStream} from "../../actions/index"
import flv from "flv.js"
const StreamShow = (props) => {
  const videoRef=React.createRef();
 useEffect(()=>{
    props.fetchStream(props.match.params.id)
    buildPlayer();
    
 },[])
 useEffect(()=>{
   buildPlayer();
   
 })

 const buildPlayer=()=>{
   if (!props.stream){
     return <div>Loading...</div>;
   }
   const player=flv.createPlayer({
    type:"flv",
    url:`http://localhost:8000/live/${props.match.params.id}.flv`
  });
  player.attachMediaElement(videoRef.current);
  player.load();
  
 }
  if (!props.stream){
     return <div>Loading...</div>;
   }
 const {title,description}=props.stream
  return (
        <div>
          <video ref={videoRef} style={{width:"100%"}} controls/>
          <h1>{title}</h1>
          <h5>{description}</h5>
        </div>
  )
}
const mapStateToProps=(state,ownProps)=>{
  return{stream:state.streams[ownProps.match.params.id]}
}
export default connect(mapStateToProps,{fetchStream})(StreamShow)