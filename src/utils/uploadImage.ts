import * as cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

export const uploadImage = async (upload: any) => {
    const { createReadStream } = await upload;
  
    let resultUrl = '';
  
    const cloudinaryUpload = async (stream: any) => {
      try {
        await new Promise((resolve, reject) => {
          const streamLoad = cloudinary.v2.uploader.upload_stream(function (
            error,
            result,
          ) {
            if (result) {
              resultUrl = result.secure_url;
              resolve(resultUrl);
            } else {
              reject(error);
            }
          });
  
          stream().pipe(streamLoad);
        });
      } catch (err) {
        throw new Error(`Failed to upload profile picture ! Err:${err.message}`);
      }
    };
  
    await cloudinaryUpload(createReadStream);
    return resultUrl;
  };