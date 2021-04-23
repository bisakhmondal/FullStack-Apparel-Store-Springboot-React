import React from 'react';
import Card from './Card';
import axios from 'axios';

class CardList extends React.Component{
    constructor(){
        super();
        this.state={
            deals:[]
        }
    }
    componentDidMount(){
        this.fetchData();
    }

    fetchData=async()=>{
        const route='http://localhost:8080/apis/getdeals';

        const deals=await axios.get(route);
        console.log(deals.data)
        this.setState({deals:deals.data.map(d=> JSON.parse(d))});
    }
    
    render(){
        if(this.state.deals.length===0){
            return <h1 className='f1 tc'>Loading</h1>
        }
        const lis=this.state.deals.filter((val)=>val.name.toLowerCase().includes(this.props.ip.toLowerCase()));
        const dealsList= lis.map((val)=>{
            return <Card deal={val} />
        });
    
        return (
            <div className='tc'>
            <p className='f2 tc'> Top Picks</p>
            {dealsList}
            </div>
        )
        }
}
export default CardList;