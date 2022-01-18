import { useEffect, useReducer } from "react";

export function useFolder(folderId = null) {
  // here null is used, becuase firebase doesn't work well with undefined.
  const [state, dispatch] = useReducer();
}
