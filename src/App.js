import React from 'react';
import './App.css';
import {v4 as uuidv4} from 'uuid'
import { Route, Link } from 'react-router-dom';
import CategoryHeader from './CategoryHeader/CategoryHeader'
import ItemList from './ItemList/ItemList'
import AddItemForm from './AddItemForm/AddItemForm'
import GroceryListContext from './GroceryListContext'

class App extends React.Component {
  static contextType = GroceryListContext

  state = {
    items: [],
    categoryFilter: 'All',
  }

  changeCategoryFilter = (filter) => {
    this.setState({
      categoryFilter: filter
    })
  }

  addItem = (name, qty, category) => {
    const newItem = {
      'name': name,
      'quantity': Number(qty),
      'category': category,
      'key': uuidv4()
    }
    this.state.items.push(newItem)
    this.setState({
      items: this.state.items
    })
  }

  deleteItem = (itemname, category, key) => {
    const newItemArray = this.state.items.filter(item => item.key !== key)
    this.setState({
      items: newItemArray
    })
    if (this.categoryDoesNotExist(newItemArray, category) < 1) { //if last item in category was deleted reverts this.state.categoryFilter to 'All'
      this.setState({
        categoryFilter: 'All'
      })
    }
  }

  categoryDoesNotExist = (array, categoryFilter) => {
    let counter = 0
    let i = 0
    for (i; i < array.length; i++) {
      if (array[i].category === categoryFilter) {
        counter++;  
      } else {
        counter = counter + 0;
      }
    }
    return counter;
  }

  resetCategoryState = () => {
    this.setState({
      categoryFilter: 'All'
    })
  }

  newItemState = () => {
    this.setState({
      categoryFilter: 'New'
    })
  }

  render() {
    const contextValue = {
      items: this.state.items,
      categoryFilter: this.state.categoryFilter,
      changeCategoryFilter: this.changeCategoryFilter,
      deleteItem: this.deleteItem,
      resetCategoryState: this.resetCategoryState,
      addItem: this.addItem,
      newItemState: this.newItemState
    }

    return (
      <div className='App'>
        <GroceryListContext.Provider value={contextValue}>
          <header className='App__header'>
            <Link to={'/'} onClick={this.resetCategoryState}>
              <h1>Grocery List</h1>
            </Link>
            <Route exact path={'/'} component={CategoryHeader}/>
          </header>
          <main className='App__main'>
          <Route exact path={'/'} component={ItemList}/>
          <Route path={'/additem'} component={AddItemForm}/>
          </main>
        </GroceryListContext.Provider>
      </div>
    )
  }
}

export default App;
