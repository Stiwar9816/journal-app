export const fileUpload = async (file) => {
    if (!file) throw new Error('No existe ningun archivo')
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dwtf5ftav/upload'
    const formData = new FormData()

    formData.append('upload_preset', 'JournalApp')
    formData.append('file', file)
    try {
        const res = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })
        if (!res.ok) throw new Error('No se pudo subir la imagen')
        const cloudRes = await res.json()
        return cloudRes.secure_url
    } catch (error) {
        throw new Error(error.message)
    }
}