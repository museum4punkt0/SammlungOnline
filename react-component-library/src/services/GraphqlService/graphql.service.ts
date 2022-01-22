import { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';

type GraphqlVariables = Record<string, string | number | string[] | number[]>;

class GraphqlService {
  private readonly _client: GraphQLClient;

  constructor(endpoint: string) {
    this._client = new GraphQLClient(endpoint);
  }

  public query<T>(query: DocumentNode, variables: GraphqlVariables): Promise<T> {
    return this._client.request(query, variables);
  }
}

export default GraphqlService;
