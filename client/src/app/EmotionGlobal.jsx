import React from "react";
import { Global } from "@emotion/core";

export default function EmotionGlobal() {
  return <Global styles={{ "*:focus": { outline: "none" } }} />;
}
