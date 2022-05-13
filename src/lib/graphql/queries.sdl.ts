import { gql } from '@apollo/client';

export default gql`
  query GetSteps($parentId: ID!) {
    getSteps(input: { parentId: $parentId }) {
      id
      data
      name
      workInstructionId
    }
  }

  query GetWorkInstruction($workInstructionId: ID!) {
    getWorkInstruction(input: { givenId: $workInstructionId }) {
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
