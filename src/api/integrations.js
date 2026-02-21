// import { base44 } from './base44Client';




// export const Core = base44.integrations.Core;

// export const InvokeLLM = base44.integrations.Core.InvokeLLM;

// export const SendEmail = base44.integrations.Core.SendEmail;

// export const UploadFile = base44.integrations.Core.UploadFile;

// export const GenerateImage = base44.integrations.Core.GenerateImage;

// export const ExtractDataFromUploadedFile = base44.integrations.Core.ExtractDataFromUploadedFile;

// export const CreateFileSignedUrl = base44.integrations.Core.CreateFileSignedUrl;

// export const UploadPrivateFile = base44.integrations.Core.UploadPrivateFile;


// ===== MOCK DATA & ALTERNATIVES =====

export const InvokeLLM = {
  request: {
    model: 'gpt-4',
    prompt: 'Summarize the key points from this contract.',
    temperature: 0.7,
    maxTokens: 500,
  },
  response: {
    content: 'The contract outlines the lease terms including rental payments, maintenance responsibilities, and termination conditions.',
    tokens: 45,
    model: 'gpt-4',
  },
};

export const InvokeLLMAlternative = {
  request: {
    model: 'claude-3-opus',
    prompt: 'Extract all important dates and deadlines from this legal document.',
    temperature: 0.3,
    maxTokens: 1000,
  },
  response: {
    content: 'Important dates:\n- Lease start: January 1, 2024\n- Payment due: 1st of each month\n- Renewal date: December 31, 2025\n- Termination notice: 60 days prior',
    tokens: 78,
    model: 'claude-3-opus',
  },
};

export const SendEmail = {
  request: {
    to: 'client@example.com',
    subject: 'Case Update: Smith v. Jones',
    body: 'Dear Client,\n\nWe have received the latest documents for your case...',
    from: 'legal@nirwbuilder.com',
  },
  response: {
    success: true,
    messageId: 'msg-12345',
    timestamp: new Date().toISOString(),
    deliveryStatus: 'sent',
  },
};

export const SendEmailAlternative = {
  request: {
    to: ['client1@example.com', 'client2@example.com'],
    subject: 'Urgent: Action Required',
    body: 'Please sign and return the attached documents by Friday.',
    from: 'legal@nirwbuilder.com',
    attachments: ['document1.pdf', 'document2.pdf'],
  },
  response: {
    success: true,
    messageId: 'msg-67890',
    timestamp: new Date().toISOString(),
    deliveryStatus: 'sent',
    recipientCount: 2,
  },
};

export const UploadFile = {
  request: {
    file: new File(['content'], 'contract.pdf', { type: 'application/pdf' }),
    caseId: 'case-001',
    documentName: 'Contract Agreement',
  },
  response: {
    success: true,
    fileId: 'file-001',
    fileName: 'contract.pdf',
    fileSize: 2048000,
    uploadedAt: new Date().toISOString(),
    url: 'https://storage.example.com/case-001/contract.pdf',
  },
};

export const UploadFileAlternative = {
  request: {
    file: new File(['content'], 'evidence.jpg', { type: 'image/jpeg' }),
    caseId: 'case-002',
    documentName: 'Evidence Photo',
    isPrivate: true,
  },
  response: {
    success: true,
    fileId: 'file-002',
    fileName: 'evidence.jpg',
    fileSize: 1024000,
    uploadedAt: new Date().toISOString(),
    url: 'https://private-storage.example.com/case-002/evidence.jpg',
    accessControl: 'private',
  },
};

export const GenerateImage = {
  request: {
    prompt: 'Timeline diagram of contract execution dates and milestones',
    style: 'professional',
    size: '1024x768',
  },
  response: {
    success: true,
    imageId: 'img-001',
    imageUrl: 'https://generated-images.example.com/timeline-001.png',
    generatedAt: new Date().toISOString(),
  },
};

export const GenerateImageAlternative = {
  request: {
    prompt: 'Organizational chart showing case stakeholders and relationships',
    style: 'corporate',
    size: '1280x720',
  },
  response: {
    success: true,
    imageId: 'img-002',
    imageUrl: 'https://generated-images.example.com/orgchart-002.png',
    generatedAt: new Date().toISOString(),
  },
};

export const ExtractDataFromUploadedFile = {
  request: {
    fileId: 'file-001',
    extractionType: 'structured',
    dataFields: ['dates', 'parties', 'amounts', 'obligations'],
  },
  response: {
    success: true,
    extractedData: {
      dates: ['2024-01-01', '2024-12-31'],
      parties: ['Smith Legal Corp', 'Jones Industries'],
      amounts: ['$5,000', '$10,000'],
      obligations: ['Payment on 1st of month', 'Maintenance at tenant expense'],
    },
    confidence: 0.95,
    processedAt: new Date().toISOString(),
  },
};

export const ExtractDataFromUploadedFileAlternative = {
  request: {
    fileId: 'file-002',
    extractionType: 'ocr',
    language: 'en',
  },
  response: {
    success: true,
    extractedText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    confidence: 0.92,
    pageCount: 5,
    processedAt: new Date().toISOString(),
  },
};

export const CreateFileSignedUrl = {
  request: {
    fileId: 'file-001',
    expiresIn: 3600,
    action: 'read',
  },
  response: {
    success: true,
    signedUrl: 'https://storage.example.com/signed/file-001?token=abc123xyz789',
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
  },
};

export const CreateFileSignedUrlAlternative = {
  request: {
    fileId: 'file-002',
    expiresIn: 7200,
    action: 'write',
  },
  response: {
    success: true,
    signedUrl: 'https://storage.example.com/signed/file-002?token=def456uvw012',
    expiresAt: new Date(Date.now() + 7200000).toISOString(),
  },
};

export const UploadPrivateFile = {
  request: {
    file: new File(['sensitive content'], 'confidential.pdf', { type: 'application/pdf' }),
    caseId: 'case-001',
    accessLevel: 'attorney-only',
  },
  response: {
    success: true,
    fileId: 'pfile-001',
    fileName: 'confidential.pdf',
    fileSize: 512000,
    uploadedAt: new Date().toISOString(),
    accessLevel: 'attorney-only',
    encryptionStatus: 'encrypted',
  },
};

export const UploadPrivateFileAlternative = {
  request: {
    file: new File(['sealed documents'], 'sealed-evidence.pdf', { type: 'application/pdf' }),
    caseId: 'case-003',
    accessLevel: 'judge-only',
  },
  response: {
    success: true,
    fileId: 'pfile-002',
    fileName: 'sealed-evidence.pdf',
    fileSize: 768000,
    uploadedAt: new Date().toISOString(),
    accessLevel: 'judge-only',
    encryptionStatus: 'encrypted',
  },
};






