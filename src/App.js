import React from "react";
import axios from 'axios'
class App extends React.Component{
        state={
            advise:" "
        };

   componentDidMount(){
      this.fetchAdvise();
   }

   fetchAdvise = ()=>{
    axios.get('https://api.adviceslip.com/advice')
          .then((res)=>{
                const {advice}= res.data.slip;
                this.setState({advice});
    })
    .catch((err)=>{
console.log(err);
    })
   }



    render(){
        const { advice }=this.state;
        return(
            <h1>{advice}</h1>
        )

            
        
    }
}
export default App;