export const uploadFileToS3 = async (file) => {
    console.log(`Pretending to upload ${file.orginalname} to S3...`);

    return {
         url: `https://s3-bucket.amazonaws.com/dummy-folder/${file.originalname}`,
        key: `dummy-folder/${file.originalname}`,
    }
}