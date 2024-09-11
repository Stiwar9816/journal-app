import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";
import { getEnviroments } from '../../src/helpers/getEnviroments';


const {
    VITE_CLOUD_NAME,
    VITE_API_KEY_CLOUDINARY,
    VITE_API_SECRET_CLOUDINARY,
} = getEnviroments()

cloudinary.config({
    cloud_name: VITE_CLOUD_NAME,
    api_key: VITE_API_KEY_CLOUDINARY,
    api_secret: VITE_API_SECRET_CLOUDINARY,
    secure: true
})

describe('Pruebas en fileUpload', () => {
    it('Debe de subir el archivo correctamente a cloudinary', async () => {
        const urlImage = 'https://th.bing.com/th/id/OIP.Kvnt8i-tk9x0FmU6xXPPlwHaEo?rs=1&pid=ImgDetMain'
        const res = await fetch(urlImage)
        const blob = await res.blob()
        const file = new File([blob], 'react.jpg')
        const url = await fileUpload(file)
        expect(typeof url).toBe('string')
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')
        await cloudinary.api.delete_resources([imageId])
    });

    it('Debe retornar un null', async () => {
        const file = new File([], 'react.jpg')
        const url = await fileUpload(file)
        expect(url).toBe(null)
    });

});
