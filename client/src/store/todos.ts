import { makeAutoObservable } from 'mobx';
import { ITodo, TodoDto } from '../models/ITodo.interface';

import { TodoService } from '../services/TodoService';
import { TodoStore } from './todo';

class TodosStore {
  todos: ITodo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTodos(todos: TodoStore[]) {
    this.todos = todos;
  }
  async getTodos(path: string) {
    try {
      const response = await TodoService.getTodos(path);
      const { data } = response;
      this.setTodos(data.map((todo) => new TodoStore(todo)));
    } catch (error) {
      console.log(error);
    }
  }

  async addTodo(todo: TodoDto) {
    try {
      const response = await TodoService.addTodo(todo);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(id: string, todo: ITodo) {
    try {
      const response = await TodoService.updateTodo(id, todo);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export const todosStore = new TodosStore();
