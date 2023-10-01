import { extendTheme } from "@chakra-ui/react"; 
import breakpoints from "./components/breakpoints";
import Color from "./components/color";

const theme = extendTheme({ breakpoints, Color });

export default theme;
