import app from '../Service/FirebaseApp';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import * as FileSystem from "expo-file-system";

import {collection, getDocs, setDoc, doc, deleteDoc} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

import { CardItem } from '.././CardItem';

const db = getFirestore(app);
const storage = getStorage(app)
export function generateUUID(digits:number) {
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
  let uuid = [];
  for (let i = 0; i < digits; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join('');
}

export default class RecipeService {

  static async getAllRecipe() {
    const querySnapshot = await getDocs(collection(db, 'recipesV2'));

    return querySnapshot.docs.map(d => {
      var data = d.data();
      return {
        id: data.id,
        title: data.title,
        tags: !Array.isArray(data.tags) ? data.tags.split(',').map((x : string) => x.trim()) : data.tags,
        imageUri: data.imageUri
    } as CardItem;
    })
  }

  static async addRecipe(recipe:CardItem) {
    const newId = generateUUID(32);
    try{

    const fileName = newId + '.jpg';
    const url = await this.uploadBase64AsBlob(recipe.imageUri, fileName);  

    await setDoc(doc(db, 'recipesV2', newId), {
      id: newId,
      title: recipe.title,
      tags: recipe.tags.join(', '),
      imageUri: url,
    });

    }catch(e){
      console.log('ERROR' + e)
    }
  }

  static async uploadBase64AsBlob(base64String: string, filePath: string) {
    try {
      const fileUri = FileSystem.cacheDirectory + "tempImage.jpg";
  
      const base64Data = base64String.includes("base64,")
      ? base64String.split("base64,")[1]
      : base64String;

      // Base64 konvertálása fájllá
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const downloadUrl = this.uploadFile(fileUri, filePath);
  
      // Fájl törlése a cache-ből
      await FileSystem.deleteAsync(fileUri, { idempotent: true });

      return downloadUrl
    } catch (error) {
      console.error("Hiba történt:", error);
    }
  };

  static async uploadFile(filepath: string, filename: string) {
    const blob = await this.urlToBlob(filepath);
    const storageRef = ref(storage, filename)

    await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl
  }

  static urlToBlob(url: string) : Promise<Blob>{
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob'; // convert type
      xhr.send();
    });
  }

  static async deleteItem(id:string, imageUrl: string) {
    await deleteDoc(doc(db, 'recipesV2', id));

    const fileName = this.getFileNameFromUrl(imageUrl)
    
    if (fileName === ''){
      return
    }

    const desertRef = ref(storage, fileName);
    await deleteObject(desertRef);
  }

  static getFileNameFromUrl = (url: string): string => {
    try {
      const decodedUrl = decodeURIComponent(url);
      const match = decodedUrl.match(/\/o\/(.*?)\?/);
      return match ? match[1] : '';
    } catch (error) {
      console.error("Error extracting file name:", error);
      return '';
    }
  };
  

  /*static async deleteItem(recipeName, imageName, whenDone, deleteImage = true) {
    await deleteDoc(doc(db, 'recipes', recipeName));

    if (imageName == '') {
      whenDone(true);
      return;
    }

    if (deleteImage){
      const desertRef = ref(storage, imageName);
      deleteObject(desertRef).then(whenDone(true));
      return;
    }

    whenDone(true)
  }

  

  static async getImageUrl(name, whenDone) {
    if (name == undefined || name=='') {
      return '';
    }

    let downloadedUrl = '';
    await getDownloadURL(ref(storage, name))
        .then((url) => {
          downloadedUrl = url;
        })
        .catch((error) => {
          console.log(error);
        });

    whenDone(downloadedUrl);
    return downloadedUrl;
  }*/
}
