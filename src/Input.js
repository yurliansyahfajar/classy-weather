import { useRef, useEffect } from "react";
import { useKey } from "./useKey";

export function Input({ location, setLocation }) {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) {
      return;
    }
    inputEl.current.focus();
    setLocation("");
  });

  return (
    <input
      type="text"
      placeholder="Search for location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      ref={inputEl}
    ></input>
  );
}
