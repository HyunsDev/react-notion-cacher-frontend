import { useContext } from "react";
import { PagesContext } from "../context/pages.context";

export function usePages() {
    return useContext(PagesContext);
}
