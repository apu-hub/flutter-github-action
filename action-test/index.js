import axios from 'axios';
import FormData from "form-data"
import fs from "node:fs/promises"
// build/app/outputs/flutter-apk/app-release.apk
const osPath = "/home/runner/work/flutter-github-action/flutter-github-action"
const basePath = process.env.BASE_PATH || "/build/app/outputs/flutter-apk"
const fileName = process.env.FILE_NAME || "/app-release.apk";
const filePath = osPath + basePath + fileName;

const file = await fs.readFile(filePath);

const form = new FormData();

console.log(process.env.UPLOAD_SECRET_KEY);   // Only Dev

form.append('file', file, fileName);
form.append('name', 'latest');
form.append('secret_key', process.env.UPLOAD_SECRET_KEY || '');

// Send form data with axios
const response = await axios.post('http://ec2-3-110-167-11.ap-south-1.compute.amazonaws.com:3000/upload', form, {
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  headers: { 'Content-Type': 'multipart/form-data;boundary=' + form.getBoundary() }
});

console.log(response.data);   // Only Dev