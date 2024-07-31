import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "preline/preline";
import { type IStaticMethods } from "preline/preline";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

/**
 * Add code that reinitializes the components every time when app is mounted or page was changed
 * Docs: https://preline.co/docs/frameworks-react.html
 */
export function usePrelineEffect() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);
}
