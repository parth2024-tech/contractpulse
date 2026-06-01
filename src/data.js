// Fake contract data used across the app
export const contracts = [
  {
    id: 1,
    vendor: 'Salesforce',
    initial: 'S',
    color: '#ef4444',
    annualSpend: 72000,
    contractStart: '2024-03-01',
    contractEnd: '2025-03-01',
    noticePeriod: '30 days',
    deadlineDate: '2025-01-30',
    daysRemaining: 12,
    autoRenewal: true,
    noticeMethod: 'Written email to contracts@salesforce.com',
    extractionConfidence: 96,
    status: 'Act Now',
    dateUploaded: '2025-01-10',
  },
  {
    id: 2,
    vendor: 'HubSpot',
    initial: 'H',
    color: '#f59e0b',
    annualSpend: 48000,
    contractStart: '2024-06-15',
    contractEnd: '2025-06-15',
    noticePeriod: '60 days',
    deadlineDate: '2025-04-16',
    daysRemaining: 42,
    autoRenewal: true,
    noticeMethod: 'Portal submission via account settings',
    extractionConfidence: 91,
    status: 'Coming Up',
    dateUploaded: '2025-01-08',
  },
  {
    id: 3,
    vendor: 'Zoom',
    initial: 'Z',
    color: '#22c55e',
    annualSpend: 18000,
    contractStart: '2024-09-01',
    contractEnd: '2025-09-01',
    noticePeriod: '30 days',
    deadlineDate: '2025-08-02',
    daysRemaining: 150,
    autoRenewal: false,
    noticeMethod: 'Email to billing@zoom.us',
    extractionConfidence: 88,
    status: 'Safe',
    dateUploaded: '2025-01-05',
  },
  {
    id: 4,
    vendor: 'Notion',
    initial: 'N',
    color: '#22c55e',
    annualSpend: 9600,
    contractStart: '2024-11-01',
    contractEnd: '2025-11-01',
    noticePeriod: '30 days',
    deadlineDate: '2025-10-02',
    daysRemaining: 211,
    autoRenewal: true,
    noticeMethod: 'In-app cancellation',
    extractionConfidence: 94,
    status: 'Safe',
    dateUploaded: '2025-01-12',
  },
  {
    id: 5,
    vendor: 'Datadog',
    initial: 'D',
    color: '#ef4444',
    annualSpend: 64000,
    contractStart: '2024-04-01',
    contractEnd: '2025-04-01',
    noticePeriod: '45 days',
    deadlineDate: '2025-02-15',
    daysRemaining: 28,
    autoRenewal: true,
    noticeMethod: 'Written notice to legal@datadoghq.com',
    extractionConfidence: 92,
    status: 'Act Now',
    dateUploaded: '2025-01-09',
  },
  {
    id: 6,
    vendor: 'Figma',
    initial: 'F',
    color: '#f59e0b',
    annualSpend: 12000,
    contractStart: '2024-07-01',
    contractEnd: '2025-07-01',
    noticePeriod: '30 days',
    deadlineDate: '2025-06-01',
    daysRemaining: 55,
    autoRenewal: true,
    noticeMethod: 'Email to support@figma.com',
    extractionConfidence: 89,
    status: 'Coming Up',
    dateUploaded: '2025-01-11',
  },
]

// Sort by days remaining ascending
export const sortedContracts = [...contracts].sort((a, b) => a.daysRemaining - b.daysRemaining)

export const alerts = [
  {
    id: 1,
    vendor: 'Salesforce',
    alertType: '30-day warning',
    date: '2025-01-18',
    status: 'Sent',
    contractId: 1,
  },
  {
    id: 2,
    vendor: 'Salesforce',
    alertType: '60-day warning',
    date: '2024-12-01',
    status: 'Sent',
    contractId: 1,
  },
  {
    id: 3,
    vendor: 'Datadog',
    alertType: '30-day warning',
    date: '2025-01-16',
    status: 'Sent',
    contractId: 5,
  },
  {
    id: 4,
    vendor: 'HubSpot',
    alertType: '60-day warning',
    date: '2025-02-15',
    status: 'Scheduled',
    contractId: 2,
  },
  {
    id: 5,
    vendor: 'Figma',
    alertType: '90-day warning',
    date: '2025-03-03',
    status: 'Scheduled',
    contractId: 6,
  },
  {
    id: 6,
    vendor: 'HubSpot',
    alertType: '90-day warning',
    date: '2025-01-16',
    status: 'Sent',
    contractId: 2,
  },
]

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const getStatusColor = (status) => {
  switch (status) {
    case 'Act Now': return 'bg-danger/15 text-danger border border-danger/20'
    case 'Coming Up': return 'bg-warning/15 text-warning border border-warning/20'
    case 'Safe': return 'bg-safe/15 text-safe border border-safe/20'
    default: return 'bg-text-secondary/15 text-text-secondary'
  }
}

export const getDaysColor = (days) => {
  if (days < 30) return 'text-danger font-semibold'
  if (days <= 60) return 'text-warning font-semibold'
  return 'text-safe'
}

/**
 * Returns the total annual spend across all contracts.
 * @param {Array} contractList - Array of contract objects
 * @returns {number} Total spend in USD
 */
export const getTotalSpend = (contractList) => {
  return contractList.reduce((sum, c) => sum + (c.annualSpend || 0), 0)
}

/**
 * Returns contracts filtered by status.
 * @param {Array} contractList - Array of contract objects
 * @param {'Act Now'|'Coming Up'|'Safe'} status - Status to filter by
 * @returns {Array} Filtered contracts
 */
export const getContractsByStatus = (contractList, status) => {
  return contractList.filter((c) => c.status === status)
}

/**
 * Returns the number of days until the contract deadline from today.
 * @param {string} deadlineDate - ISO date string (e.g. '2025-03-01')
 * @returns {number} Days remaining (negative if past)
 */
export const calcDaysRemaining = (deadlineDate) => {
  const today = new Date()
  const deadline = new Date(deadlineDate)
  const diff = deadline - today
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * Returns a human-readable urgency label based on days remaining.
 * @param {number} days
 * @returns {string}
 */
export const getUrgencyLabel = (days) => {
  if (days < 0) return 'Expired'
  if (days < 30) return 'Act Now'
  if (days <= 60) return 'Coming Up'
  return 'Safe'
}
