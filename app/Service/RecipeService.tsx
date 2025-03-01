import app from '../Service/FirebaseApp';
import {getFirestore} from 'firebase/firestore';

import {collection, getDocs} from 'firebase/firestore';

import { CardItem } from '.././CardItem';
const db = getFirestore(app);

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

  /*static async addRecipe(recipe, whenDone) {
    await setDoc(doc(db, 'recipes', recipe.name), {
      name: recipe.name,
      tags: recipe.tags,
      imageName: recipe.imageName,
    });

    await this.uploadFile(recipe.imageUri, recipe.imageName);
    whenDone(true);
  }

  static async uploadFile(filepath, filename) {
    const blob = await this.urlToBlob(filepath);
    await uploadBytes(ref(storage, filename), blob);
  }

  static urlToBlob(url) {
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

  static async deleteItem(recipeName, imageName, whenDone, deleteImage = true) {
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
