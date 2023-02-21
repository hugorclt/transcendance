import React from "react";

function dec2hex (dec : number) {
  return dec.toString(16).padStart(2, "0")
}

function generateId (len : number) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}

function Auth42() {
  const reqUrl: string = process.env["REACT_APP_42URL"]!;

  return (
    <div>
      <a href={reqUrl}>
        <button>
          42Login
        </button>
      </a>
    </div>
  );
}

export default Auth42;
