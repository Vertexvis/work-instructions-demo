import { SpeedDial, SpeedDialAction } from "@material-ui/core";
import {
  ReportProblemOutlined,
  Settings,
  TextSnippetOutlined,
  WidgetsOutlined,
} from "@material-ui/icons";

import { Action, ToolButtons } from "./Viewer";

interface Props {
  readonly onClick: (button: ToolButtons) => void;
}

export function InstructionSpeedDial({ onClick }: Props): JSX.Element {
  const actions: Action[] = [
    {
      icon: <Settings />,
      name: "Settings",
      onClick: () => onClick("settings"),
    },
    {
      icon: <TextSnippetOutlined />,
      name: "Instructions",
      onClick: () => onClick("instructions"),
    },
    {
      icon: <WidgetsOutlined />,
      name: "Parts List",
      onClick: () => onClick("parts"),
    },
    {
      icon: <ReportProblemOutlined />,
      name: "Report issue",
      onClick: () => onClick("issue"),
    },
  ];

  return (
    <SpeedDial
      ariaLabel="Work instruction toolbar"
      direction="down"
      hidden={true}
      open={true}
      sx={{ mr: 3 }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => action.onClick()}
        />
      ))}
    </SpeedDial>
  );
}
