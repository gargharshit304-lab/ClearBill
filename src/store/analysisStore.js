/**
 * Analysis Store
 * Centralized state management using Zustand
 * Manages: files, analysis status, progress, results, and errors
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const initialState = {
  // File uploads
  billFile: null,
  reportFile: null,

  // Analysis status
  status: 'idle', // 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error'
  progress: 0,
  currentStage: 'Uploading securely',
  currentStageIndex: 0,

  // Analysis type
  analysisType: 'cross_verification', // 'bill' | 'report' | 'cross_verification'

  // Results
  analysisResult: null,

  // Error handling
  error: null,

  // Reprocessing (second upload)
  isReprocessing: false,
  reProgress: 0,
  reCurrentStage: 'Deep Cross-Verification',
  reCurrentStageIndex: 0,
}

export const useAnalysisStore = create(
  devtools(
    (set, get) => ({
      // Initial state
      ...initialState,

      // File actions
      setBillFile: (file) => set({ billFile: file }, false, 'setBillFile'),
      setReportFile: (file) => set({ reportFile: file }, false, 'setReportFile'),
      removeBillFile: () => set({ billFile: null }, false, 'removeBillFile'),
      removeReportFile: () => set({ reportFile: null }, false, 'removeReportFile'),

      // Analysis status actions
      setStatus: (status) => set({ status }, false, 'setStatus'),
      setProgress: (progress) => set({ progress }, false, 'setProgress'),
      setCurrentStage: (stage, index) =>
        set({ currentStage: stage, currentStageIndex: index }, false, 'setCurrentStage'),

      // Analysis result actions
      setAnalysisResult: (result) => {
        const billFile = get().billFile
        const reportFile = get().reportFile
        const analysisType = billFile && reportFile ? 'cross_verification' : billFile ? 'bill' : 'report'
        set(
          { analysisResult: result, analysisType, status: 'complete' },
          false,
          'setAnalysisResult'
        )
      },

      // Reprocessing actions
      setIsReprocessing: (isReprocessing) =>
        set({ isReprocessing }, false, 'setIsReprocessing'),
      setReProgress: (progress) => set({ reProgress: progress }, false, 'setReProgress'),
      setReCurrentStage: (stage, index) =>
        set(
          { reCurrentStage: stage, reCurrentStageIndex: index },
          false,
          'setReCurrentStage'
        ),

      // Error handling
      setError: (error) => set({ error, status: 'error' }, false, 'setError'),
      clearError: () => set({ error: null }, false, 'clearError'),

      // Complete flow actions
      startAnalysis: () => {
        set({ status: 'analyzing', progress: 0, currentStageIndex: 0, error: null }, false, 'startAnalysis')
      },

      completeAnalysis: (result) => {
        set({ analysisResult: result, status: 'complete', progress: 100 }, false, 'completeAnalysis')
      },

      resetAnalysis: () => {
        set(initialState, false, 'resetAnalysis')
      },

      // Helper: Get current file type
      getAnalysisType: () => {
        const { billFile, reportFile } = get()
        if (billFile && reportFile) return 'cross_verification'
        if (billFile) return 'bill'
        if (reportFile) return 'report'
        return 'cross_verification'
      },

      // Helper: Check if both files uploaded
      hasBothFiles: () => {
        const { billFile, reportFile } = get()
        return !!billFile && !!reportFile
      },

      // Helper: Check if any file uploaded
      hasAnyFile: () => {
        const { billFile, reportFile } = get()
        return !!billFile || !!reportFile
      },
    }),
    {
      name: 'analysis-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
)
