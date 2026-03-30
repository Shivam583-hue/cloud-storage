import { type DriveItem } from "./types"
import { mockFiles } from "./mockFiles"
import { mockFolders } from "./mockFolders"

const f = (id: string) => mockFiles.find(file => file.id === id)!

export const mockData: DriveItem[] = [...mockFolders, f("4"), f("6")]
