import { AxiosResponse } from 'axios';
import { ITodo, TodoCreate } from '../models/ITodo.interface';
import api from '../http';

export class TodoService {
  static async getTodos(id: string): Promise<AxiosResponse<ITodo[]>> {
    return api.get<ITodo[]>(`todos/${id}`);
  }

  static async addTodo(todo: TodoCreate): Promise<AxiosResponse<ITodo>> {
    return api.post<ITodo>('todos', todo);
  }

  static async updateTodo(todo: ITodo): Promise<AxiosResponse<ITodo>> {
    const { id } = todo;
    return api.put<ITodo>(`todos/${id}`, todo);
  }

  static async deleteTodo(id: string): Promise<AxiosResponse<void>> {
    return api.delete<void>(`todos/${id}`);
  }
}
