import React from 'react';
import './AddItemForm.css';
import {Link} from 'react-router-dom'
import CategoryHeader from '../CategoryHeader/CategoryHeader'
import GroceryListContext from '../GroceryListContext';


export default class AddItemForm extends React.Component {
    static contextType = GroceryListContext

    handleSubmit(event, callback1, callback2) {
        event.preventDefault();
        const name = event.target.newItem__name.value
        const quantity = event.target.newItem__quantity.value
        const category = this.context.categoryFilter === 'New' ? event.target.newItem__category.value : this.context.categoryFilter
        callback1(name, quantity, category);
        callback2();
        this.props.history.push('/')
    }

    render() {
        const newCategoryInput = this.context.categoryFilter === 'New'?
                <>
                <label htmlFor='newItem__category'>Category: </label>
                <input type='text' id='newItem__category' name='newItem__category' required/>
                </>
            : <></>
        
        return (
            <GroceryListContext.Consumer>
                {({resetCategoryState, addItem}) => (
                <form className='AddItemForm' onSubmit={e => this.handleSubmit(e, addItem, resetCategoryState)}>
                        <div className='AddItemForm__inputs'>
                            <label htmlFor='newItem__name'>Item Name: </label>
                            <input type='text' id='newItem__name' name='newItem__name' required/>
                            <label htmlFor='newItem__quantity'>Item Quantity: </label>
                            <input type='number' id='newItem__quantity' name='newItem__quantity' defaultValue={1} min={1} max={99}/>
                            <CategoryHeader />
                            {newCategoryInput}
                        </div>
                        <div className='AddItemForm__buttons'>
                            <Link to={'/'} onClick={resetCategoryState}>
                                <button type='button'>Cancel</button>
                            </Link>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                )}
            </GroceryListContext.Consumer>
        )
    }
}