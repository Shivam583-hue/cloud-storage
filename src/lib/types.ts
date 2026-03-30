export type FileType = "document" | "image" | "video" | "other"

export interface FileItem {
  id: string
  name: string
  type: FileType
  size?: string
  modified: string
  url?: string
}

export interface FolderItem {
  id: string
  name: string
  type: "folder"
  modified: string
  children?: DriveItem[]
}

export type DriveItem = FileItem | FolderItem
