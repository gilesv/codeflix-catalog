import { BadRequestException, Injectable } from "@nestjs/common";
import { FileDescriptor } from "./file.interface";
import { Storage } from "@google-cloud/storage";
import { ConfigService } from "@nestjs/config";

interface UploadOptions {
  bucket: string,
  accept: MimeType[],
  fileName?: string
}

export enum MimeType {
  MP4 = "video/mp4",
  JPEG = "image/jpeg",
  PNG = "image/png"
}
export interface UploadedFile {
  name: string,
  kind: MimeType,
  url: string,
}

@Injectable()
export class UploadService {
  private storage: Storage;

  constructor(private config: ConfigService) {
    this.storage = new Storage();
  }

  async upload(file: FileDescriptor, options: UploadOptions): Promise<UploadedFile> {
    this.filterFile(file, options);

    let fileName = options.fileName ?? file.name;

    let fileOnBucket = await this.storage
      .bucket(options.bucket)
      .file(fileName);
    let fileOnBucketStream = fileOnBucket.createWriteStream();

    return new Promise<UploadedFile>((resolve, reject) => {
      file.content
        .pipe(fileOnBucketStream)
        .on("error", (err: Error) => reject(err))
        .on("finish", () => {
          resolve({
            name: file.label,
            url: this.generateUrl(fileName, options),
            kind: file.mimetype as MimeType,
          } as UploadedFile);
        })
      });
  }

  private filterFile(file: FileDescriptor, options: UploadOptions) {
    if (!options.accept.includes(file.mimetype as MimeType)) {
      throw new BadRequestException("Forbidden file type");
    }
  }

  private generateUrl(name: string, options: UploadOptions): string {
    let host = this.config.get<string>('GOOGLE_CLOUD_STORAGE_HOST');
    return `${host}/${options.bucket}/${name}`;
  }
}
