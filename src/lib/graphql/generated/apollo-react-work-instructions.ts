/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateStationInput = {
  workInstructionId: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateStepInput = {
  workInstructionId: Scalars['ID'];
  parentId: Scalars['ID'];
  name: Scalars['String'];
  data: Scalars['String'];
};

export type GetStationsInput = {
  workInstructionId: Scalars['ID'];
};

export type GetStepsInput = {
  parentId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createStation: Station;
  createOrGetWorkInstruction: WorkInstruction;
  createStep: WorkInstructionStep;
};


export type MutationCreateStationArgs = {
  input: CreateStationInput;
};


export type MutationCreateOrGetWorkInstructionArgs = {
  input: WorkInstructionCreateInput;
};


export type MutationCreateStepArgs = {
  input: CreateStepInput;
};

export type Query = {
  __typename?: 'Query';
  getStations: Array<Station>;
  getWorkInstruction?: Maybe<WorkInstruction>;
  getSteps: Array<WorkInstructionStep>;
};


export type QueryGetStationsArgs = {
  input: GetStationsInput;
};


export type QueryGetWorkInstructionArgs = {
  input: WorkInstructionInput;
};


export type QueryGetStepsArgs = {
  input: GetStepsInput;
};

export type Station = {
  __typename?: 'Station';
  id: Scalars['ID'];
  workInstructionId: Scalars['ID'];
  name: Scalars['String'];
};

export type WorkInstruction = {
  __typename?: 'WorkInstruction';
  id: Scalars['ID'];
  sceneId: Scalars['ID'];
  name: Scalars['String'];
  stations: Array<Station>;
};

export type WorkInstructionCreateInput = {
  givenId: Scalars['ID'];
  sceneId: Scalars['ID'];
  name: Scalars['String'];
};

export type WorkInstructionInput = {
  givenId: Scalars['ID'];
  sceneId?: Maybe<Scalars['ID']>;
};

export type WorkInstructionStep = {
  __typename?: 'WorkInstructionStep';
  id: Scalars['ID'];
  workInstructionId: Scalars['ID'];
  parentId: Scalars['ID'];
  name: Scalars['String'];
  data: Scalars['String'];
};

export type GetStepsQueryVariables = Exact<{
  parentId: Scalars['ID'];
}>;


export type GetStepsQuery = (
  { __typename?: 'Query' }
  & { getSteps: Array<(
    { __typename?: 'WorkInstructionStep' }
    & Pick<WorkInstructionStep, 'id' | 'data' | 'name' | 'workInstructionId'>
  )> }
);

export type GetWorkInstructionQueryVariables = Exact<{
  workInstructionId: Scalars['ID'];
}>;


export type GetWorkInstructionQuery = (
  { __typename?: 'Query' }
  & { getWorkInstruction?: Maybe<(
    { __typename?: 'WorkInstruction' }
    & Pick<WorkInstruction, 'id' | 'name' | 'sceneId'>
    & { stations: Array<(
      { __typename?: 'Station' }
      & Pick<Station, 'id' | 'name'>
    )> }
  )> }
);


export const GetStepsDocument = gql`
    query GetSteps($parentId: ID!) {
  getSteps(input: {parentId: $parentId}) {
    id
    data
    name
    workInstructionId
  }
}
    `;

/**
 * __useGetStepsQuery__
 *
 * To run a query within a React component, call `useGetStepsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStepsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStepsQuery({
 *   variables: {
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useGetStepsQuery(baseOptions: Apollo.QueryHookOptions<GetStepsQuery, GetStepsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStepsQuery, GetStepsQueryVariables>(GetStepsDocument, options);
      }
export function useGetStepsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStepsQuery, GetStepsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStepsQuery, GetStepsQueryVariables>(GetStepsDocument, options);
        }
export type GetStepsQueryHookResult = ReturnType<typeof useGetStepsQuery>;
export type GetStepsLazyQueryHookResult = ReturnType<typeof useGetStepsLazyQuery>;
export type GetStepsQueryResult = Apollo.QueryResult<GetStepsQuery, GetStepsQueryVariables>;
export const GetWorkInstructionDocument = gql`
    query GetWorkInstruction($workInstructionId: ID!) {
  getWorkInstruction(input: {givenId: $workInstructionId}) {
    id
    name
    sceneId
    stations {
      id
      name
    }
  }
}
    `;

/**
 * __useGetWorkInstructionQuery__
 *
 * To run a query within a React component, call `useGetWorkInstructionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkInstructionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkInstructionQuery({
 *   variables: {
 *      workInstructionId: // value for 'workInstructionId'
 *   },
 * });
 */
export function useGetWorkInstructionQuery(baseOptions: Apollo.QueryHookOptions<GetWorkInstructionQuery, GetWorkInstructionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkInstructionQuery, GetWorkInstructionQueryVariables>(GetWorkInstructionDocument, options);
      }
export function useGetWorkInstructionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkInstructionQuery, GetWorkInstructionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkInstructionQuery, GetWorkInstructionQueryVariables>(GetWorkInstructionDocument, options);
        }
export type GetWorkInstructionQueryHookResult = ReturnType<typeof useGetWorkInstructionQuery>;
export type GetWorkInstructionLazyQueryHookResult = ReturnType<typeof useGetWorkInstructionLazyQuery>;
export type GetWorkInstructionQueryResult = Apollo.QueryResult<GetWorkInstructionQuery, GetWorkInstructionQueryVariables>;