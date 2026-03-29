"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Folder,
  FileText,
  FileImage,
  FileVideo,
  File,
  ChevronRight,
  Upload,
  Home,
} from "lucide-react"

type FileType = "folder" | "document" | "image" | "video" | "other"

interface DriveItem {
  id: string
  name: string
  type: FileType
  size?: string
  modified: string
  url?: string
  children?: DriveItem[]
}

const mockData: DriveItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    modified: "Mar 15, 2026",
    children: [
      {
        id: "1-1",
        name: "Work",
        type: "folder",
        modified: "Mar 10, 2026",
        children: [
          {
            id: "1-1-1",
            name: "Q1 Report.pdf",
            type: "document",
            size: "2.4 MB",
            modified: "Mar 8, 2026",
            url: "https://example.com/files/q1-report.pdf",
          },
          {
            id: "1-1-2",
            name: "Budget 2026.xlsx",
            type: "document",
            size: "1.2 MB",
            modified: "Mar 5, 2026",
            url: "https://example.com/files/budget-2026.xlsx",
          },
        ],
      },
      {
        id: "1-2",
        name: "Personal",
        type: "folder",
        modified: "Mar 12, 2026",
        children: [
          {
            id: "1-2-1",
            name: "Resume.pdf",
            type: "document",
            size: "156 KB",
            modified: "Feb 20, 2026",
            url: "https://example.com/files/resume.pdf",
          },
        ],
      },
      {
        id: "1-3",
        name: "Meeting Notes.docx",
        type: "document",
        size: "45 KB",
        modified: "Mar 14, 2026",
        url: "https://example.com/files/meeting-notes.docx",
      },
    ],
  },
  {
    id: "2",
    name: "Photos",
    type: "folder",
    modified: "Mar 20, 2026",
    children: [
      {
        id: "2-1",
        name: "Vacation 2025",
        type: "folder",
        modified: "Dec 28, 2025",
        children: [
          {
            id: "2-1-1",
            name: "Beach.jpg",
            type: "image",
            size: "3.2 MB",
            modified: "Dec 25, 2025",
            url: "https://picsum.photos/1920/1080?random=1",
          },
          {
            id: "2-1-2",
            name: "Sunset.jpg",
            type: "image",
            size: "2.8 MB",
            modified: "Dec 26, 2025",
            url: "https://picsum.photos/1920/1080?random=2",
          },
        ],
      },
      {
        id: "2-2",
        name: "Profile Picture.png",
        type: "image",
        size: "512 KB",
        modified: "Jan 15, 2026",
        url: "https://picsum.photos/400/400?random=3",
      },
    ],
  },
  {
    id: "3",
    name: "Videos",
    type: "folder",
    modified: "Mar 18, 2026",
    children: [
      {
        id: "3-1",
        name: "Tutorial.mp4",
        type: "video",
        size: "156 MB",
        modified: "Mar 10, 2026",
        url: "https://example.com/files/tutorial.mp4",
      },
      {
        id: "3-2",
        name: "Conference Recording.mp4",
        type: "video",
        size: "892 MB",
        modified: "Mar 5, 2026",
        url: "https://example.com/files/conference.mp4",
      },
    ],
  },
  {
    id: "4",
    name: "Project Proposal.pdf",
    type: "document",
    size: "3.1 MB",
    modified: "Mar 25, 2026",
    url: "https://example.com/files/proposal.pdf",
  },
  {
    id: "5",
    name: "Design Assets",
    type: "folder",
    modified: "Mar 22, 2026",
    children: [
      {
        id: "5-1",
        name: "Logo.svg",
        type: "image",
        size: "24 KB",
        modified: "Mar 20, 2026",
        url: "https://example.com/files/logo.svg",
      },
      {
        id: "5-2",
        name: "Brand Guidelines.pdf",
        type: "document",
        size: "8.5 MB",
        modified: "Mar 18, 2026",
        url: "https://example.com/files/brand-guidelines.pdf",
      },
      {
        id: "5-3",
        name: "Icons",
        type: "folder",
        modified: "Mar 15, 2026",
        children: [
          {
            id: "5-3-1",
            name: "icon-set.zip",
            type: "other",
            size: "2.1 MB",
            modified: "Mar 14, 2026",
            url: "https://example.com/files/icon-set.zip",
          },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "Notes.txt",
    type: "document",
    size: "2 KB",
    modified: "Mar 28, 2026",
    url: "https://example.com/files/notes.txt",
  },
]

function getFileIcon(type: FileType) {
  switch (type) {
    case "folder":
      return <Folder className="h-5 w-5 text-blue-400" />
    case "document":
      return <FileText className="h-5 w-5 text-blue-300" />
    case "image":
      return <FileImage className="h-5 w-5 text-green-400" />
    case "video":
      return <FileVideo className="h-5 w-5 text-red-400" />
    default:
      return <File className="h-5 w-5 text-muted-foreground" />
  }
}

interface BreadcrumbPath {
  id: string
  name: string
  items: DriveItem[]
}

export default function DrivePage() {
  const [currentPath, setCurrentPath] = useState<BreadcrumbPath[]>([
    { id: "root", name: "My Drive", items: mockData },
  ])

  const currentItems = currentPath[currentPath.length - 1]!.items

  const handleFolderClick = (item: DriveItem) => {
    if (item.type === "folder" && item.children) {
      setCurrentPath([
        ...currentPath,
        { id: item.id, name: item.name, items: item.children },
      ])
    }
  }

  const handleBreadcrumbClick = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1))
  }

  const handleUploadClick = () => {
    alert("Upload functionality would open a file picker here!")
  }

  // Sort items: folders first, then files
  const sortedItems = [...currentItems].sort((a, b) => {
    if (a.type === "folder" && b.type !== "folder") return -1
    if (a.type !== "folder" && b.type === "folder") return 1
    return a.name.localeCompare(b.name)
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">Drive</h1>
            <Button onClick={handleUploadClick} className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center gap-1 text-sm">
            {currentPath.map((crumb, index) => (
              <li key={crumb.id} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
                <button
                  onClick={() => handleBreadcrumbClick(index)}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-accent ${index === currentPath.length - 1
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {index === 0 && <Home className="h-4 w-4" />}
                  {crumb.name}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        {/* File List */}
        <div className="rounded-lg border border-border">
          {/* List Header */}
          <div className="grid grid-cols-12 gap-4 border-b border-border px-4 py-3 text-sm font-medium text-muted-foreground">
            <div className="col-span-6">Name</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-2">Type</div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-border">
            {sortedItems.length === 0 ? (
              <div className="px-4 py-12 text-center text-muted-foreground">
                This folder is empty
              </div>
            ) : (
              sortedItems.map((item) => (
                <DriveListItem
                  key={item.id}
                  item={item}
                  onFolderClick={handleFolderClick}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

interface DriveListItemProps {
  item: DriveItem
  onFolderClick: (item: DriveItem) => void
}

function DriveListItem({ item, onFolderClick }: DriveListItemProps) {
  const isFolder = item.type === "folder"

  const content = (
    <div
      className={`grid grid-cols-12 gap-4 px-4 py-3 text-sm transition-colors hover:bg-accent ${isFolder ? "cursor-pointer" : ""
        }`}
      onClick={isFolder ? () => onFolderClick(item) : undefined}
    >
      <div className="col-span-6 flex items-center gap-3">
        {getFileIcon(item.type)}
        <span className="truncate text-foreground">{item.name}</span>
      </div>
      <div className="col-span-2 flex items-center text-muted-foreground">
        {item.modified}
      </div>
      <div className="col-span-2 flex items-center text-muted-foreground">
        {item.size ?? "—"}
      </div>
      <div className="col-span-2 flex items-center capitalize text-muted-foreground">
        {item.type}
      </div>
    </div>
  )

  if (isFolder) {
    return content
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {content}
    </a>
  )
}
