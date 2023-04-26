import { makeAutoObservable } from 'mobx';
import { ITodo } from '../models/ITodo.interface';

export class TodoStore {
  id;
  title;
  description;
  finishDate;
  status;
  priority;
  createdBy;
  assignee;
  updatedAt;
  createdAt;
  constructor({
    id,
    title,
    description,
    finishDate,
    status,
    priority,
    createdBy,
    assignee,
    updatedAt,
    createdAt,
  }: ITodo) {
    makeAutoObservable(this);
    this.id = id;
    this.title = title;
    this.description = description;
    this.finishDate = finishDate;
    this.status = status;
    this.priority = priority;
    this.createdBy = createdBy;
    this.assignee = assignee;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}
