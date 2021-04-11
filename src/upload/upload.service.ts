import { Injectable } from "@nestjs/common";
import { FileDescriptor } from "./file.interface";
import { Storage } from "@google-cloud/storage";

interface UploadOptions {
  bucket: string,
  folder: string,
}

export interface UploadedFile {
  label: string,
  name: string,
  kind: "video" | "image",
  size: number,
}

@Injectable()
export class UploadService {
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  async upload(file: FileDescriptor, options: UploadOptions): Promise<UploadedFile> {
    let blob = await this.storage.bucket(options.bucket).file(file.name);
    let blobStream = blob.createWriteStream();

    return new Promise<UploadedFile>((resolve, reject) => {
      file.content.pipe(blobStream)
        .on("error", (err: Error) => reject(err))
        .on("finish", () => {
          resolve({
            label: file.label,
            name: file.name,
            kind: "image",
            size: blob.metadata.size || 555,
          });
        })
      });
  }
}
