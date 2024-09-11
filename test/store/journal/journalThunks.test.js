import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { firebaseDB } from '../../../src/firebase';
import { addNewEmptyNote, savingNewNote, setActiveNote } from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks'

describe('Pruebas en el JournalThunks', () => {
    const dispatch = jest.fn()
    const getState = jest.fn()

    beforeEach(() => jest.clearAllMocks())
    it('startNewNote debe de crear una nueva nota en blanco', async () => {
        const uid = 'test_uid'
        const emptyNote = {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number)
        }
        getState.mockReturnValue({ auth: { uid } })
        await startNewNote()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(savingNewNote())
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(emptyNote))
        expect(dispatch).toHaveBeenCalledWith(setActiveNote(emptyNote))
        // Delete docs firebase
        const collectionRef = collection(firebaseDB, `${uid}/journal/notes`)
        const docs = await getDocs(collectionRef)
        const deletePromise = []
        docs.forEach(doc => deletePromise.push(deleteDoc(doc.ref)))
        await Promise.all(deletePromise)
    });

});
