import {AxiosResponse} from 'axios';
import {ITodo, TodoCreate  } from '../models/ITodo.interface';
import api from '../http';

export class TodoService{
  static async getTodos(path: string): Promise<AxiosResponse<ITodo[]>>{
    return api.get<ITodo[]>(path);
  }

  static async addTodo(todo: TodoCreate): Promise<AxiosResponse<ITodo>>{
    return api.post<ITodo>('todos', todo);
  }

  static async updateTodo(id: string, todo: ITodo): Promise<AxiosResponse<ITodo>>{
    return api.put<ITodo>(`todos/${id}`, todo);
  }

  static async deleteTodo(id: string): Promise<AxiosResponse<void>>{
    return api.delete<void>(`todos/${id}`);
  }
}