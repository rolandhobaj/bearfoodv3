import app from '../Service/FirebaseApp';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import * as FileSystem from "expo-file-system";

import {collection, getDocs, setDoc, doc} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, uploadString } from 'firebase/storage';

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

    await this.uploadBase64AsBlob(recipe.imageUri, newId + '.jpg');  

    /*await setDoc(doc(db, 'recipesV2', newId), {
      id: recipe.id,
      title: recipe.title,
      tags: recipe.tags,
      imageName: recipe.imageUri,
    });*/
    }catch(e){
      console.log('ERROR' + e)
    }

    //await this.uploadFile(recipe.imageUri, newId);
  }

  static async uploadBase64AsBlob (base64String: string, filePath: string) {
    try {
      const fileUri = FileSystem.cacheDirectory + "tempImage.jpg";
  
      const base64Data = base64String.includes("base64,")
      ? base64String.split("base64,")[1]
      : base64String;

      // Base64 konvertálása fájllá
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      this.uploadFile(fileUri, filePath);
  
      // Fájl törlése a cache-ből
      await FileSystem.deleteAsync(fileUri, { idempotent: true });
    } catch (error) {
      console.error("Hiba történt:", error);
    }
  };

  static async uploadFile(filepath: string, filename: string) {
    const blob = await this.urlToBlob(filepath);
    await uploadBytes(ref(storage, filename), blob);
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
