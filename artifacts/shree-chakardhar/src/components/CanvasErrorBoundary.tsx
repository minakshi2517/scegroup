import { Component, type ReactNode } from "react";

let webglSupport: boolean | undefined;

export function supportsWebGL() {
  if (webglSupport !== undefined) return webglSupport;
  if (typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    webglSupport = Boolean(context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglSupport = false;
  }

  return webglSupport;
}

type CanvasErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

export class CanvasErrorBoundary extends Component<
  CanvasErrorBoundaryProps,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
