import React from 'react';
import Card from './Card';

const CardList = ({data}) => {
    const [deals, setDeals] = React.useState([])
    
    React.useEffect(()=>{
        setDeals(data)
    })

    
    const Render = () => {
        if(deals?.length===0){
            return <h1 className='f1 tc'>Loading</h1>
        }
        const lis=deals;//.filter((val)=>val.name.toLowerCase().includes(this.props.ip.toLowerCase()));
        const dealsList= lis.map((val)=>{
            return <Card deal={val} />
        });
    
        return (
            <div className='tc'>
            {dealsList}
            </div>
        )
        }

    return(
        <Render />
    )
}
export default CardList;