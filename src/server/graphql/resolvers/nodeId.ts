export function encodeId(typeName: string, parent: { readonly id: string }) {
  return Buffer.from(`${typeName}:${parent.id}`).toString("base64");
}

export function decodeId(nodeId: string) {
  const decoded = Buffer.from(nodeId, "base64").toString();
  const [typeName, id] = decoded.split(":");
  return { typeName, id };
}
