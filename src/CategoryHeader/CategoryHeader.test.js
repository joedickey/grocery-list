import React from 'react';
import ReactDOM from 'react-dom'
import CategoryHeader from './CategoryHeader';


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CategoryHeader />, div)
  ReactDOM.unmountComponentAtNode(div)
});