'use server';

import { Storage } from '@google-cloud/storage';

export const UploadFile = async (form: FormData) => {
  try {
    const file = form.get('file') as File;
    if(!file) throw new Error('No File Provided');
    if(file.size < 1) throw new Error(File is Empty);

    const buffer = await file.arrayBuffer();
    const storage = new Storage();
    await Storage.bucket('SRF-videoupload').file(file.name).save(Buffer.from(buffer));
                              
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
