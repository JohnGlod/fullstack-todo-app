import { EPriority } from './EPriority.enum';
import { EStatus } from './EStatus.enum';

export interface ITodo {
  id: string;
  title: string;
  description: string;
  finishDate: string;
  status: EStatus;
  priority: EPriority;
  createdBy: string;
  assignee: string;
  updatedAt: string;
  createdAt: string;
}

export type TodoCreate = Omit<ITodo, 'id' | 'updatedAt' | 'createdAt' | 'createdBy'>;
export type TodoDto = Omit<ITodo, 'id' | 'updatedAt' | 'createdAt'>;
