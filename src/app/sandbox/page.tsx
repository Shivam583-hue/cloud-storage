import { db } from "@/server/db"
import { mockFiles } from "@/lib/mockFiles"
import { files_table, folders_table } from "@/server/db/schema"
import { mockFolders } from "@/lib/mockFolders"

const MOCK_USER_ID = "seed_user"

const SandBoxPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <form action={async () => {
        "use server"

        const folder = await db.insert(folders_table).values(
          mockFolders.map((folder, index) => ({
            id: index + 1,
            name: folder.name,
            ownerId: MOCK_USER_ID,
            parent: index !== 0 ? 1 : null,
          }))
        )

        const file = await db.insert(files_table).values(
          mockFiles.map((file, index) => ({
            name: file.name,
            ownerId: MOCK_USER_ID,
            type: file.type,
            size: 50,
            url: file.url ?? "",
            parent: (index % 3) + 1,
          }))
        )
        console.log(file, folder)
      }}>
        <button type="submit">Seed</button>
      </form>
    </div>
  )
}

export default SandBoxPage
