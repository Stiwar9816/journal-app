import { useSelector } from "react-redux"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddButton } from "../components"

export const JournalPage = () => {
    const { isSaving, active } = useSelector(state => state.journal)
    return (
        <JournalLayout>
            {
                (!!active) ? <NoteView /> : <NothingSelectedView />
            }
            <AddButton isSaving={isSaving} />
        </JournalLayout>
    )
}
