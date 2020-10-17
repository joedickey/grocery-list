import React from 'react';
import './Items.css';
import GroceryListContext from '../GroceryListContext';



export default class Item extends React.Component {
    static contextType = GroceryListContext

    handleClick(name, category, key, callback){
        callback(name, category, key)
    }

    render() {
        const category = this.context.categoryFilter
        return (
            this.context.items.map(item => {
                if (item.category === category || category === 'All') {
                    return (
                        <li key={item.key} className='Items__entry'>
                            <div className='Items__desc'>
                                <p>{item.name}</p>
                                <p>Qty: {item.quantity}</p>
                            </div>
                            <GroceryListContext.Consumer>
                                {({deleteItem}) => (
                                    <button 
                                        type='button'
                                        onClick={() => this.handleClick(item.name, item.category, item.key, deleteItem)}
                                        >
                                            Delete Item
                                    </button>
                                )}
                            </GroceryListContext.Consumer>
                        </li>  
                    )
                }
                return <></>
            })
        ) 
    }
}