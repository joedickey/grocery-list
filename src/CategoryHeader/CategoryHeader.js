import React from 'react';
import './CategoryHeader.css';
import {Route} from 'react-router-dom'
import GroceryListContext from '../GroceryListContext';


export default class CategoryHeader extends React.Component {
    static contextType = GroceryListContext

    handleChange(event, callback) {
        const filter = event.target.value;
        callback(filter)
    }

    render () {
        const itemCategories = this.context.items.map(item => item.category)
        const duplicateCatsRemoved = [...new Set(itemCategories)].sort()
        const categories = duplicateCatsRemoved.map(cat => {
            return (
                <option value={cat} key={cat}>{cat}</option>
            )
        })
        return (
            <div className='CategoryHeader'>          
                    <div className='CategoryHeader__menu'>
                        <label htmlFor='select__category'>Select Category: </label>
                        <GroceryListContext.Consumer>
                            {({changeCategoryFilter}) => (
                                <select 
                                    id='select__category' 
                                    name='select__category' 
                                    defaultValue='All' 
                                    onChange={e => this.handleChange(e, changeCategoryFilter)}>
                                    <Route 
                                        exact 
                                        path={'/'} 
                                        render={() => 
                                            <option value='All' key='All' selected={this.context.categoryFilter === 'All'? true : false}>All</option> }/>
                                    <Route 
                                        path={'/additem'} 
                                        render={() => 
                                            <option value='New' key='New' selected>+ New Category</option>} />
                                    {categories}
                                </select>
                            )}
                        </GroceryListContext.Consumer>
                    </div>
            </div>
        )
    }
}

