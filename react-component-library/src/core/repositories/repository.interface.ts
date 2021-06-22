import { ApolloError } from 'apollo-client';

export interface IRepositoryResponse<T> {
  data: T;
  loading: boolean;
  error?: ApolloError;
}
