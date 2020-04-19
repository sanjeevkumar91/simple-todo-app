import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/components/ToDoApp'

describe('App', () => {
  let reactWrapper;

  beforeAll(() => {
    configure({ adapter: new Adapter() });
    reactWrapper = mount(<App />);
  });

  test('add a todo', () => {
    const input = reactWrapper.find('input');
    input.simulate('change', { target: { value: 'First Task' } })
    reactWrapper.find('button').simulate('click');
    const todoItem = reactWrapper.find('.todo-item-text')
    expect(todoItem.length).toEqual(1)
    expect(todoItem.text()).toEqual('First Task')
  })

  test('edit a todo', () => {
    reactWrapper.find('.edit-todo').simulate('click');
    const input = reactWrapper.find('.todo-edit-input');
    input.simulate('change', { target: { value: 'First Task 1 Modified' } })
    reactWrapper.find('.edit-todo').simulate('click');
    expect(reactWrapper.find('.todo-item-text').text()).toEqual('First Task 1 Modified')
  })

  test('complete a todo', () => {
    expect(reactWrapper.find('.todo-item.completed').length).toEqual(0)
    const checkbox = reactWrapper.find('.todo-check');
    checkbox.simulate('change', {target: { checked: true }});
    expect(reactWrapper.find('.todo-item.completed').length).toEqual(1)
  })

  test('delete a todo', () => {
    expect(reactWrapper.find('.todo-item-text').length).toEqual(1)
    reactWrapper.find('.delete-todo').simulate('click');
    expect(reactWrapper.find('.todo-item-text').length).toEqual(0)
  })
})
