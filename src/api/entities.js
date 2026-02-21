// import { base44 } from './base44Client';


// export const Case = base44.entities.Case;

// export const CaseInput = base44.entities.CaseInput;

// export const Document = base44.entities.Document;

// export const Chapter = base44.entities.Chapter;

// export const Citation = base44.entities.Citation;



// // auth sdk:
// export const User = base44.auth;


// ===== MOCK DATA =====

export const User = {
  id: 'user-001',
  email: 'john.doe@example.com',
  name: 'John Doe',
  role: 'researcher',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-02-20'),
};

export const Case = {
  id: 'case-001',
  title: 'Smith v. Jones Contract Dispute',
  description: 'Contract dispute regarding commercial lease agreement',
  status: 'active',
  type: 'civil',
  caseNumber: '2024-CV-12345',
  jurisdiction: 'State Court',
  createdBy: 'user-001',
  createdAt: new Date('2024-01-20'),
  updatedAt: new Date('2024-02-18'),
  tags: ['contract', 'commercial', 'dispute'],
};

export const CaseInput = {
  title: 'New Case Title',
  description: 'Description of the case',
  caseNumber: '2024-CV-54321',
  type: 'civil',
  jurisdiction: 'Federal Court',
  tags: ['new', 'pending'],
};

export const Document = {
  id: 'doc-001',
  caseId: 'case-001',
  title: 'Lease Agreement - Exhibit A',
  fileName: 'lease_agreement_exhibit_a.pdf',
  fileType: 'application/pdf',
  fileSize: 2048000,
  uploadedAt: new Date('2024-02-01'),
  uploadedBy: 'user-001',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  status: 'reviewed',
};

export const Chapter = {
  id: 'chapter-001',
  documentId: 'doc-001',
  title: 'Terms and Conditions',
  orderIndex: 1,
  content: 'This lease agreement outlines the following terms:\n1. Rental period...\n2. Payment terms...',
  pageNumber: 2,
  createdAt: new Date('2024-02-02'),
};

export const Citation = {
  id: 'citation-001',
  caseId: 'case-001',
  documentId: 'doc-001',
  chapterId: 'chapter-001',
  text: 'The lessor shall maintain the property in habitable condition per state law.',
  reference: 'Lease Agreement Section 3.1',
  type: 'statute',
  relevance: 'high',
  createdAt: new Date('2024-02-05'),
  createdBy: 'user-001',
};

export const CaseList = [
  Case,
  {
    id: 'case-002',
    title: 'Anderson v. State Department',
    description: 'Employment discrimination case',
    status: 'pending',
    type: 'employment',
    caseNumber: '2024-EMP-67890',
    jurisdiction: 'Federal Court',
    createdBy: 'user-001',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-15'),
    tags: ['employment', 'discrimination'],
  },
  {
    id: 'case-003',
    title: 'Estate of Martinez',
    description: 'Probate and estate settlement',
    status: 'closed',
    type: 'probate',
    caseNumber: '2023-PROB-11111',
    jurisdiction: 'Probate Court',
    createdBy: 'user-001',
    createdAt: new Date('2023-06-10'),
    updatedAt: new Date('2024-01-30'),
    tags: ['probate', 'estate'],
  },
];

export const DocumentList = [
  Document,
  {
    id: 'doc-002',
    caseId: 'case-001',
    title: 'Correspondence - Email Chain',
    fileName: 'email_correspondence.pdf',
    fileType: 'application/pdf',
    fileSize: 512000,
    uploadedAt: new Date('2024-02-05'),
    uploadedBy: 'user-001',
    content: 'Email correspondence between parties...',
    status: 'pending',
  },
];

export const ChapterList = [
  Chapter,
  {
    id: 'chapter-002',
    documentId: 'doc-001',
    title: 'Payment and Rent Terms',
    orderIndex: 2,
    content: 'Monthly rent payment of $5,000 due on the first of each month...',
    pageNumber: 5,
    createdAt: new Date('2024-02-03'),
  },
];

export const CitationList = [
  Citation,
  {
    id: 'citation-002',
    caseId: 'case-001',
    documentId: 'doc-001',
    chapterId: 'chapter-002',
    text: 'Failure to pay rent constitutes material breach of the lease.',
    reference: 'Lease Agreement Section 4.2',
    type: 'contract',
    relevance: 'critical',
    createdAt: new Date('2024-02-06'),
    createdBy: 'user-001',
  },
];