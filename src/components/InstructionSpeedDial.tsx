import { Action, ToolButtons } from "@components/Viewer";
import { SpeedDial, SpeedDialAction } from "@material-ui/core";
import {
  Settings,
  TextSnippetOutlined,
  WidgetsOutlined,
} from "@material-ui/icons";

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
          onClick={() => action.onClick()}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
