require('dotenv').config();
const aws = require('aws-sdk')
const S3 = require('aws-sdk/clients/s3')
const multer = require('multer')
const multers3 = require('multer-s3')

const fs = require('fs')

const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.S3_BUCKET_REGION
const accessKey = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;

const s3 = new S3({
    region,
    accessKey,
    secretAccessKey
})

function upload(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

exports.awsUploadFile = upload

function getFile(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}

exports.awsGetFile = getFile