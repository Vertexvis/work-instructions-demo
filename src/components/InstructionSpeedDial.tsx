import { Action, ToolButtons } from "@components/Viewer";
import {
  Settings,
  TextSnippetOutlined,
  WidgetsOutlined,
} from "@mui/icons-material";
import { SpeedDial, SpeedDialAction } from "@mui/material";

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
  ];

  return (
    <SpeedDial
      ariaLabel="Work instruction toolbar"
      direction="down"
      hidden={true}
      open={true}
      sx={{ mr: 2 }}
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
