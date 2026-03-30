import { db } from "@/server/db"
import { files_table, folders_table } from "@/server/db/schema"
import { isNull } from "drizzle-orm"
import { mapDbFile, mapDbFolder } from "@/lib/mappers"
import { type DriveItem } from "@/lib/types"
import DriveClient from "./DriveClient"

export default async function DrivePage() {
  const [folders, files] = await Promise.all([
    db.select().from(folders_table).where(isNull(folders_table.parent)),
    db.select().from(files_table).where(isNull(files_table.parent)),
  ])

  const items: DriveItem[] = [
    ...folders.map(mapDbFolder),
    ...files.map(mapDbFile),
  ]

  return <DriveClient initialItems={items} />
}
