import {
  Controller, Get, Post, Body, Patch, Param,
  Delete, UsePipes, ValidationPipe, NotFoundException, Req, Res, HttpStatus,
} from '@nestjs/common';
import e, { Request, Response } from 'express';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ConfigService } from '@nestjs/config';
const Busboy = require('busboy');
@Controller('movies')
@UsePipes(new ValidationPipe())
export class MovieController {
  constructor(private readonly movieService: MovieService, private configService: ConfigService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.create(createMovieDto);
  }

  @Post(':id')
  async addMedia(@Param('id') id: string, @Req() req: Request, @Res() res: Response): Promise<void> {
    if (!req.headers['content-type']) {
      res.status(HttpStatus.BAD_REQUEST).end("No files provided");
    }

    let busboy = new Busboy({ headers: req.headers });
    let uploads = [];

    let onFile = (
      fieldname: string,
      file: NodeJS.ReadableStream,
      filename: string,
      encoding: string,
      mimetype: string
      ) => {
        uploads.push(this.movieService.uploadFile(id, {
          label: fieldname,
          name: filename,
          encoding,
          mimetype,
          content: file,
        }));
    };

    let onFinish = async () => {
      try {
        await Promise.all(uploads);
        res.status(HttpStatus.OK).end();
      } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).end(e.message);
      }
    };

    busboy.on('file', onFile);
    busboy.on('finish', onFinish);
    req.pipe(busboy);
  }

  @Get()
  async findAll() {
    return await this.movieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    let movie = await this.movieService.findOne(id);
    if (!movie) {
      throw new NotFoundException();
    }
    return movie;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return await this.movieService.update(id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.movieService.remove(id);
  }
}
