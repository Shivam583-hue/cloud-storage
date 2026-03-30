import { type FileItem } from "./types"

export const mockFiles: FileItem[] = [
  { id: "1-1-1", name: "Q1 Report.pdf", type: "document", size: "2.4 MB", modified: "Mar 8, 2026", url: "https://example.com/files/q1-report.pdf" },
  { id: "1-1-2", name: "Budget 2026.xlsx", type: "document", size: "1.2 MB", modified: "Mar 5, 2026", url: "https://example.com/files/budget-2026.xlsx" },
  { id: "1-2-1", name: "Resume.pdf", type: "document", size: "156 KB", modified: "Feb 20, 2026", url: "https://example.com/files/resume.pdf" },
  { id: "1-3", name: "Meeting Notes.docx", type: "document", size: "45 KB", modified: "Mar 14, 2026", url: "https://example.com/files/meeting-notes.docx" },
  { id: "2-1-1", name: "Beach.jpg", type: "image", size: "3.2 MB", modified: "Dec 25, 2025", url: "https://picsum.photos/1920/1080?random=1" },
  { id: "2-1-2", name: "Sunset.jpg", type: "image", size: "2.8 MB", modified: "Dec 26, 2025", url: "https://picsum.photos/1920/1080?random=2" },
  { id: "2-2", name: "Profile Picture.png", type: "image", size: "512 KB", modified: "Jan 15, 2026", url: "https://picsum.photos/400/400?random=3" },
  { id: "3-1", name: "Tutorial.mp4", type: "video", size: "156 MB", modified: "Mar 10, 2026", url: "https://example.com/files/tutorial.mp4" },
  { id: "3-2", name: "Conference Recording.mp4", type: "video", size: "892 MB", modified: "Mar 5, 2026", url: "https://example.com/files/conference.mp4" },
  { id: "4", name: "Project Proposal.pdf", type: "document", size: "3.1 MB", modified: "Mar 25, 2026", url: "https://example.com/files/proposal.pdf" },
  { id: "5-1", name: "Logo.svg", type: "image", size: "24 KB", modified: "Mar 20, 2026", url: "https://example.com/files/logo.svg" },
  { id: "5-2", name: "Brand Guidelines.pdf", type: "document", size: "8.5 MB", modified: "Mar 18, 2026", url: "https://example.com/files/brand-guidelines.pdf" },
  { id: "5-3-1", name: "icon-set.zip", type: "other", size: "2.1 MB", modified: "Mar 14, 2026", url: "https://example.com/files/icon-set.zip" },
  { id: "6", name: "Notes.txt", type: "document", size: "2 KB", modified: "Mar 28, 2026", url: "https://example.com/files/notes.txt" },
]
