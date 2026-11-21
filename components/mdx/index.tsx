import type { MDXComponents } from "mdx/types";
import { CsvExplorer } from "../demos/csv-explorer";
import { ForecastDemo } from "../demos/forecast-demo";
import { Callout, Card, Columns, DemoFrame, Video } from "./blocks";

/**
 * Every component listed here can be used directly inside any
 * content/projects/*.mdx file, e.g. <ForecastDemo />.
 *
 * To add a new demo: create components/demos/my-demo.tsx
 * ("use client" at the top), then register it below.
 */
export const mdxComponents: MDXComponents = {
  // building blocks
  Video,
  Callout,
  Columns,
  Card,
  DemoFrame,
  // interactive demos
  ForecastDemo,
  CsvExplorer,
};
