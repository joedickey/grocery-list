import React from 'react';


const GroceryListContext = React.createContext({
    items: [],
    categoryFilter: '',
    changeCategoryFilter: () => {},
    resetCategoryState: () => {},
    addItem: () => {}
})

export default GroceryListContext;