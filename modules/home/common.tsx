import * as Popover from "common/ui/overlay/Popover/Popover";
import { IconButton } from "common/ui";
import { styled } from "stitches.config";

export const StyledIconButton = styled(IconButton, {
  background: "$lgIcon",
  transition: "all 1s ease",
  "&:hover": {
    background: "$lgIcon",
  },
  defaultVariants: {
    size: "2",
  },
});


export const StyledContent = styled(Popover.Content, {
  lg: "$lgBackground",
  border: "none",
  margin: "$3",
  br: "$2",
  w: "fit-content",
  p: "$3",
  miw: "200px",
  gap: "$2",
});
