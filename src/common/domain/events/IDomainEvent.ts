import { UniqueEntityID } from "../UniqueEntityID";

export interface IDomainEvent {
  dateTimeOccurrend: Date;
  getAggregateId(): UniqueEntityID;
}