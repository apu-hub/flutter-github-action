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

form.append('file', file, fileName);

// Send form data with axios
const response = await axios.post('https://susa.deta.dev/from-github/upload', form, {
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  headers: {'Content-Type': 'multipart/form-data;boundary=' + form.getBoundary()}
});

console.log(response.data);   // Only Dev