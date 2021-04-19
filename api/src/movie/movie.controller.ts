import {
  Controller, Get, Post, Body, Patch, Param,
  Delete, UsePipes, ValidationPipe, NotFoundException, Req, Res, HttpStatus,
} from '@nestjs/common';
import e, { Request, Response } from 'express';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ConfigService } from '@nestjs/config';
import { MovieFile } from '@prisma/client';
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
  async addMedia(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    res.type('json');

    let json = (data) => JSON.stringify(data);
    const fail = (status: HttpStatus, errorMessage: string) => {
      res.status(status).end(json({
        statusCode: status,
        error: errorMessage
      }));
    };
    const end = (payload: MovieFile) => {
      res.status(HttpStatus.OK).end(json(payload));
    }

    if (!req.headers['content-type']) {
      fail(HttpStatus.BAD_REQUEST, "No file provided")
    }

    let busboy = new Busboy({ headers: req.headers, limits: { files: 1 } });

    let onFile = async (
      fieldname: string,
      file: NodeJS.ReadableStream,
      filename: string,
      encoding: string,
      mimetype: string
      ) => {
        try {
          let movieFile = await this.movieService.uploadFile(id, {
            label: fieldname,
            name: filename,
            content: file,
            encoding,
            mimetype,
          });
          end(movieFile);
        } catch (e) {
          req.unpipe();
          fail(HttpStatus.INTERNAL_SERVER_ERROR, e.message);
        }
    };

    busboy.on('file', onFile);
    busboy.on('finish', () => req.unpipe());
    busboy.on('error', (e) => fail(HttpStatus.INTERNAL_SERVER_ERROR, e.message));

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
