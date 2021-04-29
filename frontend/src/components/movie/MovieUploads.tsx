import { Box, Flex, Text } from "@chakra-ui/layout";
import { FC, useState } from "react";
import { Movie } from "../../interfaces/movie";

import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { MovieFile } from "../../interfaces/movie-file";
import { Image } from "@chakra-ui/image";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

interface Props {
  movie: Movie,
}

export const MovieUploads: FC<Props> = ({ movie }) => {
  let posterFile = movie.files?.find((file) => file.name === "poster");
  let videoFile = movie.files?.find((file) => file.name === "main");

  return (
    <>
      <FileBox title="Poster" movie={movie} file={posterFile} name="poster" />
      <FileBox title="Vídeo" movie={movie} file={videoFile} name="main" />
    </>
  );
}

const FileBox = (
  { title, movie, file, name }: { title: string, movie: Movie, file: MovieFile|undefined, main: string}
) => {
  const [files, setFiles] = useState([]);

  return (
    <Box>
      <Flex justifyContent="space-between" flexDirection="row">
        <Box w="200px" h="200px">
          <Text fontWeight="bold">{title}</Text>
          <FilePond
            files={files}
            onupdatefiles={setFiles as any}
            allowMultiple={false}
            server={`http://localhost:3000/movies/${movie.id}/files`}
            name={name}
            labelIdle='Fazer upload'
            credits={false}
          />
        </Box>

        <Box w="200px">
          <Image src={file?.url} />
        </Box>
      </Flex>
    </Box>
  );
}