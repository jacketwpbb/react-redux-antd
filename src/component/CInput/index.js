import React from "react";
import { Input } from "antd";
import "./Cinput.css";

const Search = Input.Search;

const Cinput = (props: Object) => {
  // record if is on Composition
  let isOnComposition: boolean = false;

  // detect it is Chrome browser?
  const isChrome = !!window.chrome && !!window.chrome.webstore;

  const handleComposition = (e: KeyboardEvent) => {
    if (e.type === "compositionend") {
      // composition is end
      isOnComposition = false;

      // fixed for Chrome v53+ and detect all Chrome
      // https://chromium.googlesource.com/chromium/src/
      // +/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E%21/
      if (
        e.target instanceof HTMLInputElement &&
        !isOnComposition &&
        isChrome
      ) {
        // fire onChange
        props.onChange(e);
      }
    } else {
      // in composition
      isOnComposition = true;
    }
  };

  const handleChange = (e: KeyboardEvent) => {
    // only when onComposition===false to fire onChange
    if (e.target instanceof HTMLInputElement && !isOnComposition) {
      props.onChange(e);
    }
  };

  return (
    <Search
      {...props}
      onCompositionStart={handleComposition}
      onCompositionUpdate={handleComposition}
      onCompositionEnd={handleComposition}
      onChange={handleChange}
    />
  );
};

export default Cinput;
