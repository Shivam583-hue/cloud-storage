import { type FolderItem } from "./types"
import { mockFiles } from "./mockFiles"

const f = (id: string) => mockFiles.find(file => file.id === id)!

export const mockFolders: FolderItem[] = [
  {
    id: "1", name: "Documents", type: "folder", modified: "Mar 15, 2026",
    children: [
      { id: "1-1", name: "Work", type: "folder", modified: "Mar 10, 2026", children: [f("1-1-1"), f("1-1-2")] },
      { id: "1-2", name: "Personal", type: "folder", modified: "Mar 12, 2026", children: [f("1-2-1")] },
      f("1-3"),
    ],
  },
  {
    id: "2", name: "Photos", type: "folder", modified: "Mar 20, 2026",
    children: [
      { id: "2-1", name: "Vacation 2025", type: "folder", modified: "Dec 28, 2025", children: [f("2-1-1"), f("2-1-2")] },
      f("2-2"),
    ],
  },
  {
    id: "3", name: "Videos", type: "folder", modified: "Mar 18, 2026",
    children: [f("3-1"), f("3-2")],
  },
  {
    id: "5", name: "Design Assets", type: "folder", modified: "Mar 22, 2026",
    children: [
      f("5-1"),
      f("5-2"),
      { id: "5-3", name: "Icons", type: "folder", modified: "Mar 15, 2026", children: [f("5-3-1")] },
    ],
  },
]
