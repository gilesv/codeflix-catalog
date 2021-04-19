import { Injectable } from "@nestjs/common";
import { Movie, MovieFile } from "@prisma/client";
import { DbService } from "../db/db.service";
import { UploadedFile } from "../upload/upload.service";

@Injectable()
export class MovieFileService {
  constructor(private db: DbService) {}

  async save(movie: Movie, uploadedFile: UploadedFile): Promise<MovieFile> {
    let file = await this.findOne(movie.id, uploadedFile.name);

    if (file) {
      return await this.db.movieFile.update({
        where: { id: file.id },
        data: {
          updatedAt: new Date(),
          version: file.version + 1,
        }
      });
    } else {
      return await this.db.movieFile.create({
        data: {
          name: uploadedFile.name,
          kind: uploadedFile.kind as string,
          url: uploadedFile.url,
          movieId: movie.id,
        },
      })
    }
  }

  async findOne(movieId: string, name: string): Promise<MovieFile|void> {
    return await this.db.movieFile.findFirst({
      where: { movieId, name }
    });
  }
}
