import { useTheme } from "next-themes";
import { GearIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { styled } from "stitches.config";
import { IconButton, Box, Text, Slider } from "common/ui";
import * as Popover from "common/ui/overlay/Popover/Popover";
import { useCanvasStore } from "modules/home/store";

import { StyledIconButton, StyledContent } from "./common";

export const Settings = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <StyledIconButton>
          <GearIcon />
        </StyledIconButton>
      </Popover.Trigger>
      <StyledContent>
        <StyledCard>
          <ItemDarkMode />
          <ItemZoom />
        </StyledCard>
      </StyledContent>
    </Popover.Root>
  );
};

const ItemZoom = () => {
  const zoom = useCanvasStore((s) => s.zoom);
  const setZoom = useCanvasStore((s) => s.setZoom);
  return (
    <>
      <Text size="2" b>
        Zoom
      </Text>
      <Slider
        value={[zoom]}
        step={10}
        min={60}
        max={200}
        onValueChange={(number) => setZoom(number[0])}
      />
    </>
  );
};

const ItemDarkMode = () => (
  <>
    <Text size="2" b>
      Theme
    </Text>
    <IconButtonDarkMode />
  </>
);

export const IconButtonDarkMode = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  return (
    <IconButton onClick={toggleTheme}>
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

const StyledCard = styled("div", {
  bc: "$slate1",
  br: "$2",
  p: "$3",
  d: "grid",
  ai: "center",
  gtc: "3em 1fr",
  gap: "$2",
});
