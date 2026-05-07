/**
 * Custom React Hooks
 * Reusable hook logic for analysis, file handling, etc.
 */

import { useCallback, useEffect, useState } from 'react'
import { useAnalysisStore } from '../store/analysisStore'
import { performAnalysis } from '../services/analysisService'
import { validateFile } from '../utils/fileUtils'

/**
 * useAnalysisFlow - Manages complete analysis flow
 * Handles: files, progress, analysis execution
 *
 * @returns {object} Analysis flow state and actions
 */
export function useAnalysisFlow() {
  const store = useAnalysisStore()
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = useCallback(async () => {
    try {
      setIsAnalyzing(true)
      store.startAnalysis()

      // Perform analysis
      const result = await performAnalysis(store.billFile, store.reportFile)

      // Store result
      store.setAnalysisResult(result)
    } catch (error) {
      console.error('Analysis error:', error)
      store.setError(error.message)
    } finally {
      setIsAnalyzing(false)
    }
  }, [store.billFile, store.reportFile])

  const handleReset = useCallback(() => {
    store.resetAnalysis()
  }, [])

  return {
    // State
    billFile: store.billFile,
    reportFile: store.reportFile,
    status: store.status,
    progress: store.progress,
    currentStage: store.currentStage,
    analysisResult: store.analysisResult,
    error: store.error,
    isAnalyzing,

    // Actions
    setBillFile: store.setBillFile,
    setReportFile: store.setReportFile,
    removeBillFile: store.removeBillFile,
    removeReportFile: store.removeReportFile,
    handleAnalyze,
    handleReset,
    clearError: store.clearError,
  }
}

/**
 * useFileUpload - Manages file upload logic
 * Handles: validation, error states
 *
 * @param {string} fileType - 'bill' or 'report'
 * @returns {object} File upload state and handlers
 */
export function useFileUpload(fileType) {
  const store = useAnalysisStore()
  const [error, setError] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const getFile = useCallback(() => {
    return fileType === 'bill' ? store.billFile : store.reportFile
  }, [fileType, store.billFile, store.reportFile])

  const setFile = useCallback(
    (file) => {
      setError(null)

      if (!file) {
        if (fileType === 'bill') {
          store.removeBillFile()
        } else {
          store.removeReportFile()
        }
        return
      }

      const validation = validateFile(file)
      if (!validation.valid) {
        setError(validation.error)
        return
      }

      if (fileType === 'bill') {
        store.setBillFile(file)
      } else {
        store.setReportFile(file)
      }
    },
    [fileType, store]
  )

  const removeFile = useCallback(() => {
    setError(null)
    if (fileType === 'bill') {
      store.removeBillFile()
    } else {
      store.removeReportFile()
    }
  }, [fileType, store])

  return {
    file: getFile(),
    error,
    isDragging,
    setIsDragging,
    setFile,
    removeFile,
  }
}

/**
 * useProgressTracking - Manages analysis progress animation
 * Simulates progress stages during analysis
 *
 * @param {boolean} isAnalyzing - Whether analysis is in progress
 * @param {array} stages - Progress stages array
 * @param {number} stageInterval - Milliseconds between stages
 * @returns {object} Progress state
 */
export function useProgressTracking(isAnalyzing, stages, stageInterval = 550) {
  const store = useAnalysisStore()

  useEffect(() => {
    if (!isAnalyzing) return

    const schedule = stages.map((entry, idx) => ({
      ...entry,
      delay: 480 + idx * stageInterval,
    }))

    const timers = schedule.map((entry) =>
      window.setTimeout(() => {
        store.setCurrentStage(entry.label, entry.stage)
        store.setProgress(entry.progress)
      }, entry.delay)
    )

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [isAnalyzing, stages, stageInterval])

  return {
    progress: store.progress,
    currentStage: store.currentStage,
  }
}

/**
 * useReprocessing - Manages second-stage reprocessing (adding another file)
 * Used when user uploads second file after initial analysis
 *
 * @returns {object} Reprocessing state and actions
 */
export function useReprocessing() {
  const store = useAnalysisStore()

  const startReprocessing = useCallback(() => {
    store.setIsReprocessing(true)
    store.setReProgress(0)
  }, [])

  const updateProgress = useCallback((progress, stage, stageIndex) => {
    store.setReProgress(progress)
    store.setReCurrentStage(stage, stageIndex)
  }, [])

  const completeReprocessing = useCallback(async () => {
    // Re-analyze with both files
    const result = await performAnalysis(store.billFile, store.reportFile)
    store.setAnalysisResult(result)
    store.setIsReprocessing(false)
  }, [store.billFile, store.reportFile])

  return {
    isReprocessing: store.isReprocessing,
    reProgress: store.reProgress,
    reCurrentStage: store.reCurrentStage,
    startReprocessing,
    updateProgress,
    completeReprocessing,
  }
}

/**
 * useTabNavigation - Manages tab state for results screen
 *
 * @param {string} defaultTab - Default active tab
 * @returns {object} Tab state and handlers
 */
export function useTabNavigation(defaultTab = 'overview') {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const switchTab = useCallback((tab) => {
    setActiveTab(tab)
  }, [])

  return {
    activeTab,
    switchTab,
  }
}
