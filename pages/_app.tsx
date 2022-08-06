import type { AppType } from "next/dist/shared/lib/utils";
import { ThemeProvider } from "next-themes";
import { darkTheme, globalCss } from "stitches.config";

const globalStyle = globalCss({
  "html, body": {
    margin: 0,
    padding: 0,
    background: "$slate1",
  },
});

const App: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {
  globalStyle();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      value={{
        dark: darkTheme.className,
        light: "light",
      }}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App
