export interface FileDescriptor {
  label: string,
  name: string,
  encoding: string,
  mimetype: string,
  content: NodeJS.ReadableStream,
}
