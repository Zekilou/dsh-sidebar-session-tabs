/**
 * Host half of the example. A real plugin fetches or tunnels here (SSH, HTTP,
 * a local projection) and exposes the rows on a route its Client half polls;
 * this example ships a static page so the Client contract is the only thing to
 * read.
 */
export function apply() {}
