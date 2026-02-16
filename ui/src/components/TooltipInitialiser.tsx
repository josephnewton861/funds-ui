import { useEffect } from "react";
import { Tooltip } from "bootstrap";

// Initialises bootstrap tooltips once for the whole app
 const TooltipInitialser = () => {
  useEffect(() => {
    const delegated = new Tooltip(document.body, {
      selector: '[data-bs-toggle="tooltip"]',
      container: "body",
      trigger: "hover focus"
    });

    return () => {
      delegated.dispose();
    };
  }, []);

  return null;
}


export default TooltipInitialser;