import axios from 'axios';
import FormData from "form-data"
import fs from "node:fs/promises"
// build/app/outputs/flutter-apk/app-release.apk
const basePath = process.env.BASE_PATH || "build/app/outputs/flutter-apk"
const file = await fs.readFile('./hello.text');
const fileName = process.env.FILE_NAME || "lol.text";

const form = new FormData();

form.append('file', file, fileName);

// Send form data with axios
const response = await axios.post('https://susa.deta.dev/from-github/upload', form, {
  headers: {
    ...form.getHeaders(),
  },
});

console.log(response.data);   // Only Dev