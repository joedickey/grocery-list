import React from 'react';
import './ItemList.css';
import {Link} from 'react-router-dom'
import Items from '../Items/Items'
import GroceryListContext from '../GroceryListContext'


export default class ItemList extends React.Component {

    handleClick(callback) {
        callback()
    }

    render() {
        return (
            <div className='ItemList'>
                <Link to={'/additem'}>
                    <GroceryListContext.Consumer>
                        {({newItemState}) => (
                            <button type='button' onClick={() => this.handleClick(newItemState)}>Add Item</button>
                        )} 
                    </GroceryListContext.Consumer>  
                </Link>
                <ul className='ItemList'>
                    <Items />
                </ul>
            </div>
        )
    }
}