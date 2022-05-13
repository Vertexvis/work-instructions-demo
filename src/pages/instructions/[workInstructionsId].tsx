import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { Layout } from '@components/Layout';
import { Viewer } from "@components/Viewer";
import { Config, Configuration } from "@lib/config";
import { GetStepsDocument, GetStepsQuery, GetStepsQueryVariables, GetWorkInstructionDocument,GetWorkInstructionQuery, GetWorkInstructionQueryVariables } from '@lib/graphql/generated/apollo-react-work-instructions';
import { useViewer } from '@lib/viewer';
import { Pin, TextPin } from '@vertexvis/viewer/dist/types/lib/pins/model';
import { VertexViewerMarkup, VertexViewerMarkupArrow, VertexViewerMarkupCircle, VertexViewerMarkupFreeform, VertexViewerPinTool } from '@vertexvis/viewer-react';
import { NextPageContext } from "next";
import React, { useState } from 'react';

import { Home } from "../../components/Home";


const getWorkInstructionsClient =
  (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: from([new HttpLink({ uri: 'https://5z08ulsxxb.execute-api.us-west-2.amazonaws.com' })]),
    });
  };

interface Props {
  data?: any;
  config: Configuration
}

export function mapToPins(markers: any[]): Set<Pin> {
  const pins: Set<Pin> = new Set();
  markers.forEach((marker) => {
    if (
      marker?.markerVersion?.attributes?.__typename === 'TextMarkerAttributes'
    ) {
      const textPin: TextPin = {
        id: marker.id,
        worldPosition: marker.markerVersion.worldPosition,
        partId: marker.markerVersion.partId || '',
        label: {
          point: marker.markerVersion.attributes.position,
          text: marker.markerVersion.attributes.text,
        },
      };

      pins.add(textPin);
    } else {
      pins.add({
        id: marker.id,
        worldPosition: marker.markerVersion.worldPosition,
        partId: marker.markerVersion.partId || '',
      });
    }
  });

  return pins;
}

export default function WorkInstructionsSteps(props: Props): JSX.Element {

  props.data?.data?.getSteps.forEach((step: any) => {
    console.log(JSON.parse(step.data))
  })

  const [render, setRender] = useState(false);

  const ref = React.useRef<HTMLVertexViewerPinToolElement>(null);

  
  const snapshot = JSON.parse(props.data?.data?.getSteps[0].data);
  const viewer = useViewer();

  React.useEffect(() => {
      if (ref.current?.pinController != null) {
        const pins = mapToPins(snapshot.snapshotVersion.markers)
        ref.current.pinController.setPins(pins)
      }

      if (!render) {
        setTimeout(() => setRender(true), 1500)
      }
  }, [ref, render])

  return <Layout main={
    <Viewer
      configEnv={"platdev"}
      // experimentalGhostingOpacity={0.7}
      onClick={()=> {
        console.log('clicked')
      }}
      onSelect={async (a, b) => {
        console.log('test')
      }}
      streamKey={snapshot.streamKey.key}
      viewer={viewer.ref}
      sceneViewState={snapshot.sceneViewState.id}
    >

      <VertexViewerPinTool
        className="w-full h-full absolute"
        mode={'view'}
        ref={ref}
      />

      <VertexViewerMarkup>
        {snapshot.snapshotVersion.markups != null && snapshot.snapshotVersion.markups.length > 0  && snapshot.snapshotVersion.markups[0].shapes.map((shape: any) => {
          const id = snapshot.snapshotVersion.markups[0].id;

          console.log('shape: ', shape)
          if (shape.arrow != null) {
            return (
              <VertexViewerMarkupArrow
                id={id}
                data-color={shape.color}
                data-stroke-width={shape.lineWidth}
                key={id}
                startJson={JSON.stringify(shape.arrow.from)}
                endJson={JSON.stringify(shape.arrow.to)}
              />
            );
          } else if (shape.circle != null) {
            return (
              <VertexViewerMarkupCircle
                id={id}
                data-color={shape.color}
                data-stroke-width={shape.lineWidth}
                data-testid={`snapshot-markup-${id}`}
                key={id}
                boundsJson={JSON.stringify(shape.circle)}
              />
            );
          } else if (shape.freeform != null) {
            return (
              <VertexViewerMarkupFreeform
                id={id}
                data-color={shape.color}
                data-stroke-width={shape.lineWidth}
                data-testid={`snapshot-markup-${id}`}
                key={id}
                boundsJson={JSON.stringify(shape.freeform.bounds)}
                pointsJson={JSON.stringify(shape.freeform.points)}
                
              />
            );
          }
        })}
      </VertexViewerMarkup>
    </Viewer>
  }>
  </Layout>
}

export const getServerSideProps = async (handler: NextPageContext): Promise<Record<string, any>> => {
  
  const {req, query } = handler;

  const client = getWorkInstructionsClient();

  try {
      const wi = await client.query<
        GetWorkInstructionQuery,
        GetWorkInstructionQueryVariables
      >({
        query: GetWorkInstructionDocument,
        variables: {
          workInstructionId: query.workInstructionsId as string,
        },
      });

      if (wi.data.getWorkInstruction?.stations != null && wi.data.getWorkInstruction?.stations.length > 0) {
        const steps = await client.query<
          GetStepsQuery,
          GetStepsQueryVariables
        >({
          query: GetStepsDocument,
          variables: {
            parentId: wi.data.getWorkInstruction?.stations[0].id
          },
        });

        return {
          props: {
            config: { authoring: Config.authoring, vertexEnv: Config.vertexEnv },
            data: steps
          }
        };
      }

    } catch (e) {
      console.error(e)
    }
  return {
    props: {
      config: { authoring: Config.authoring, vertexEnv: Config.vertexEnv },
    }
  };
};

