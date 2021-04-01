import * as IntentLauncher from 'expo-intent-launcher';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export async function getImageFromCamera(width, height){
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
        let capturedImage = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            
            aspect: [width, height],
        });
        if (!capturedImage.cancelled) {
            var image = await fetch(capturedImage.uri);
            var Blob = await image.blob();

            const SelectedImage= {
                imageUrl: capturedImage.uri,
                blob: Blob
            };
            return SelectedImage
        }
    }else{
        return{error:"Permission Denied"}
    }

}

export async function getImageFromGallery(width, height){
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if(cameraRollPermission.status === 'granted') {
        let selectedImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [width, height]
        })
        if(!selectedImage.cancelled) {
            var image = await fetch(selectedImage.uri);
            var Blob = await image.blob();

            const SelectedimageObj = {
                imageUrl: selectedImage.uri,
                blob: Blob
            };
            return SelectedimageObj;
        }
    }else{
        return {error:"Permission Denied"}
    }
}

export function openSettingApp() {
    if(Platform.OS==='ios'){
        Linking.openURL('app-settings:');
    }
    else{
        IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
    }
}

export async function getUserLoction(){
    try{
        let {status} = await Permissions.askAsync(Permissions.LOCATION);

        if(status === 'granted'){
            let location = await Location.getCurrentPositionAsync({});
            return location
        }

    }catch(e){
        return {
            error: 'Permission to access location is denied!'
        }
    }

    
    
}
