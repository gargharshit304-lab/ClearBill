# ClearBill Frontend Architecture

**Version**: 2.0 (Refactored)  
**Last Updated**: 2024  
**Status**: Production Ready (Mock Mode)

## Overview

ClearBill frontend has been refactored into a **scalable, professional architecture** that separates concerns and prepares the application for backend integration with FastAPI + OpenRouter Claude AI.

### Key Principles

- **Separation of Concerns**: State, logic, UI, and data are strictly separated
- **Type Safety**: JSDoc types define all data structures
- **Reusability**: Components, hooks, and utilities are designed for reuse
- **Testability**: All functions are pure and independently testable
- **Scalability**: Ready for AI integration without UI changes

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     React Components (Pages)                │
│                    AnalysisFlowPage.jsx                      │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                   Custom Hooks Layer                        │
│    useAnalysisFlow(), useFileUpload(), useReprocessing()   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                  State Management (Zustand)                 │
│                   src/store/analysisStore.js                │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                   Service Layer                             │
│   src/services/analysisService.js (Mock → Real API)        │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                  Utilities & Validators                     │
│  src/utils/ + src/data/ + src/types/                       │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── pages/
│   ├── LandingPage.jsx              # Home page
│   └── AnalysisFlowPage.jsx          # Main analysis flow (processing → results)
│
├── components/
│   └── analysis/                    # Reusable analysis components
│       ├── ConfidenceBar.jsx         # Animated progress bar
│       ├── RiskGauge.jsx             # Circular risk indicator
│       ├── ExpandableRow.jsx         # Collapsible list item
│       ├── ReportSummaryTab.jsx      # Medical report tab
│       ├── BillingIssuesTab.jsx      # Billing concerns tab
│       ├── CrossCheckTab.jsx         # Bill vs report alignment
│       ├── QuestionsTab.jsx          # Follow-up questions
│       └── index.js                  # Component exports
│
├── store/
│   └── analysisStore.js             # Zustand global state
│
├── services/
│   ├── analysisService.js           # Analysis operations (Mock → Real API)
│   └── api.js                       # API config & placeholders
│
├── hooks/
│   └── useAnalysis.js               # Custom hooks collection
│       ├── useAnalysisFlow()
│       ├── useFileUpload()
│       ├── useProgressTracking()
│       ├── useReprocessing()
│       └── useTabNavigation()
│
├── utils/
│   ├── fileUtils.js                 # File validation & handling
│   └── validators.js                # Data validators
│
├── data/
│   └── mockAnalysis.js              # Mock analysis responses
│
├── types/
│   └── analysis.js                  # JSDoc type definitions
│
└── App.jsx                          # Router setup
```

## Core Layers

### 1. **Type Definitions** (`src/types/analysis.js`)

All data structures are defined with JSDoc for type safety without TypeScript:

```javascript
/**
 * @typedef {object} AnalysisBillIssue
 * @property {string} id - Unique identifier
 * @property {string} title - Issue title
 * @property {string} description - Detailed description
 * @property {string} severity - 'high' | 'medium' | 'low'
 * @property {number} confidence - Confidence 0-1
 * @property {string} suggestion - Recommended action
 */
```

**Usage**: Import and use in JSDoc comments for IDE autocomplete and validation.

### 2. **State Management** (`src/store/analysisStore.js`)

Zustand store provides centralized global state:

```javascript
const state = {
  billFile, reportFile,           // Uploaded files
  status, progress, currentStage,  // Processing state
  analysisResult,                  // Analysis data
  error, isReprocessing            // Error & reprocessing states
}

const actions = {
  setBillFile(file),               // File management
  setAnalysisResult(data),         // Result storage
  startAnalysis(), completeAnalysis(),  // Flow control
  clearError(),                    // Error handling
}
```

**Usage**: Access anywhere with `const store = useAnalysisStore()`

### 3. **Service Layer** (`src/services/analysisService.js`)

Provides async analysis operations. Currently returns mock data, will connect to FastAPI backend:

```javascript
// Currently mock, will be real API calls
const result = await analyzeBill(billFile)
const result = await analyzeReport(reportFile)
const result = await analyzeCrossVerification(billFile, reportFile)
```

Each service:
- Validates input
- Simulates network delay
- Validates output structure
- Sanitizes response
- Returns Promise

### 4. **Custom Hooks** (`src/hooks/useAnalysis.js`)

Reusable logic components:

- **`useAnalysisFlow()`** - Orchestrates full analysis lifecycle
- **`useFileUpload(fileType)`** - File upload with validation
- **`useProgressTracking(isAnalyzing, stages)`** - Progress animation
- **`useReprocessing()`** - Second-stage analysis with additional file
- **`useTabNavigation(defaultTab)`** - Tab state management

### 5. **Utility Functions**

**File Utilities** (`src/utils/fileUtils.js`):
- `validateFile(file)` - File type & size validation
- `formatFileSize(bytes)` - Format bytes to readable size
- `isPdfFile(file)`, `isImageFile(file)` - Type checks
- `createFilePreview(file)` - Object URL for images

**Validators** (`src/utils/validators.js`):
- `validateAnalysisResult(result)` - Validate response structure
- `validateApiResponse(response)` - Validate API response format
- `sanitizeAnalysisResult(result)` - Remove sensitive data

### 6. **Mock Data** (`src/data/mockAnalysis.js`)

Realistic mock analysis responses with:
- 3 complete analysis scenarios (bill, report, cross-verification)
- `getMockAnalysis(hasBill, hasReport)` function
- Matches real API response structure
- Used by service layer during development

### 7. **Reusable Components** (`src/components/analysis/`)

**Base Components**:
- **`ConfidenceBar`** - Animated progress indicator for 0-100% values
- **`RiskGauge`** - Circular risk score display (0-10 scale)
- **`ExpandableRow`** - Collapsible list item with animation

**Tab Components**:
- **`ReportSummaryTab`** - Displays medical report analysis
- **`BillingIssuesTab`** - Shows flagged billing items
- **`CrossCheckTab`** - Bill vs report alignment
- **`QuestionsTab`** - Follow-up questions for hospital

All components:
- Accept data via props (not hardcoded)
- Have JSDoc type definitions
- Are animation-ready (Framer Motion)
- Support default mock data

## Data Flow

### Analysis Flow

```
1. User uploads file(s)
   ↓
2. Files validated (src/utils/fileUtils.js)
   ↓
3. Files stored in Zustand (src/store/analysisStore.js)
   ↓
4. User clicks "Analyze"
   ↓
5. analysisService.performAnalysis() called
   ↓
6. Service validates, simulates delay, returns mock data
   ↓
7. Result stored in Zustand store
   ↓
8. Components render data from store
   ↓
9. User can upload second file for reprocessing
   ↓
10. Cross-verification analysis performed
    ↓
11. Updated results displayed in tabs
```

### Component Data Flow

```
Page Component (AnalysisFlowPage.jsx)
    ↓
    ├─→ useAnalysisFlow() hook
    │   ├─→ Reads: store.billFile, store.reportFile, store.analysisResult
    │   └─→ Writes: All store state
    │
    ├─→ Renders Tab Components
    │   ├─→ ReportSummaryTab receives props: data (from store)
    │   ├─→ BillingIssuesTab receives props: issues (from store)
    │   ├─→ CrossCheckTab receives props: items (from store)
    │   └─→ QuestionsTab receives props: questions (from store)
    │
    └─→ Renders Sidebar Components
        ├─→ RiskGauge receives props: score (from store)
        └─→ ConfidenceBar receives props: value (from store)
```

## Integration Points for Backend

### When Backend is Ready

Replace mock implementation in `src/services/analysisService.js`:

```javascript
// Current (Mock)
export async function analyzeBill(billFile) {
  if (API_CONFIG.SIMULATE_DELAY) await delay()
  const mockResult = getMockAnalysis(true, false)
  return sanitizeAnalysisResult(mockResult)
}

// Future (Real API)
export async function analyzeBill(billFile) {
  const response = await apiRequest('POST', '/api/analyze/bill', {
    file: billFile,
    model: 'openrouter/auto'
  })
  return sanitizeAnalysisResult(response.data)
}
```

### API Config (`src/services/api.js`)

- BASE_URL: FastAPI server (default: `localhost:8000`)
- ENDPOINTS: API route definitions
- OPENROUTER: Configuration for Claude model
- Request helpers will be implemented here

## Testing Strategy

All layers are independently testable:

1. **Types**: Validate data structures
2. **Store**: Test state mutations
3. **Services**: Mock fetch calls, verify transformation
4. **Hooks**: Mount and verify state/behavior
5. **Components**: Render with test data, verify UI

## Performance Considerations

- **Lazy Loading**: Tab content loaded on demand
- **Animation**: GPU-accelerated with Framer Motion
- **State**: Zustand provides efficient re-renders
- **Validation**: Early validation prevents bad data
- **Mock Data**: 5.5s simulated delay matches real API

## Future Roadmap

### Currency Preservation

Backend OCR processing should run `backend/utils/currencyDetector.py` immediately after text extraction. The detected metadata must be attached to every analysis response:

```json
{
  "currency": "INR",
  "currencySymbol": "₹",
  "estimatedOvercharge": 1245
}
```

The AI prompt must instruct Claude/OpenRouter to preserve the detected billing currency and never convert or mix currencies. Frontend money rendering should use `currencySymbol + amount` through `src/utils/currency.js`.

Phase 3 (Backend Integration):
1. Implement FastAPI server
2. Configure OpenRouter Claude API
3. Update `analysisService.js` to call real API
4. Add authentication/authorization
5. Implement file upload to backend
6. Add database persistence
7. Implement user sessions

Phase 4 (Advanced Features):
1. Real-time streaming responses
2. Multi-file batch processing
3. Report generation/export
4. User history & saved analyses
5. Admin dashboard

## Debugging

### Enable Store DevTools

```javascript
// In analysisStore.js - already enabled
devtools: (set, get, api) => ({...})
```

Access via React DevTools → Zustand tab

### Check Validation

```javascript
import { validateAnalysisResult } from 'src/utils/validators'

const validation = validateAnalysisResult(result)
console.log(validation.errors)  // See what failed
```

### Mock Data Structure

All mock data in `src/data/mockAnalysis.js` is designed to match realistic API responses and can be used for testing component rendering:

```javascript
const testData = getMockAnalysis(true, true)
// Pass to components as props during development
```

## Best Practices

1. **Always validate input** - Use validators before processing
2. **Store in Zustand** - Don't prop-drill state deep
3. **Use custom hooks** - Extract logic from components
4. **Component props** - Receive data via props, not internal state
5. **Error handling** - All services must handle errors gracefully
6. **Type safety** - Add JSDoc comments to all functions
7. **Separation** - Keep UI, logic, and data separate

## Common Tasks

### Add a New Analysis Type

1. Add type in `src/types/analysis.js`
2. Add mock data in `src/data/mockAnalysis.js`
3. Add service function in `src/services/analysisService.js`
4. Create UI component in `src/components/analysis/`
5. Add tab in results screen

### Add a New Validation

1. Add validator function in `src/utils/validators.js`
2. Call from service layer before returning
3. Handle validation errors in components

### Connect to Real API

1. Implement request in `src/services/api.js`
2. Update service functions to use real API
3. Update API_CONFIG with actual endpoints
4. Test with real backend

---

**Questions?** Refer to the inline JSDoc comments in each file for detailed documentation.
