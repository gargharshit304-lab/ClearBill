/**
 * Questions Tab Component
 * Displays recommended questions to ask the hospital
 */

import { motion } from 'framer-motion'

/**
 * @typedef {object} Question
 * @property {string} q - Question text
 * @property {'High' | 'Medium' | 'Low'} priority - Priority level
 * @property {string} explanation - Why this question matters
 */

/**
 * QuestionsTab - Questions for hospital follow-up
 * @param {object} props
 * @property {Question[]} [props.questions] - Questions to display
 * @returns {JSX.Element}
 */
export function QuestionsTab({ questions = [] }) {
  // Default questions if not provided
  const defaultQuestions = questions.length
    ? questions
    : [
        {
          q: 'Why was room charge billed twice?',
          priority: 'High',
          explanation: 'Ask for timeline showing two separate room usages.',
        },
        {
          q: 'Can I see the pharmacy invoice?',
          priority: 'High',
          explanation: 'Need unit price and quantity for the antibiotic charge.',
        },
        {
          q: 'Which clinical note references the MRI?',
          priority: 'High',
          explanation: 'Procedure notes confirm medical necessity.',
        },
        {
          q: 'Was facility fee charged twice?',
          priority: 'Medium',
          explanation: 'Clarify if fee applies at admission and/or discharge.',
        },
      ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 hover:bg-red-100'
      case 'Medium':
        return 'bg-amber-50 text-amber-700 hover:bg-amber-100'
      default:
        return 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
    }
  }

  const handleCopyQuestion = (question) => {
    navigator.clipboard?.writeText(question)
  }

  return (
    <div className="space-y-2">
      {defaultQuestions.map((question, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="p-3 border border-slate-200 rounded-lg"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-semibold text-slate-900 text-sm">{question.q}</p>
              <p className="text-xs text-slate-600 mt-1">{question.explanation}</p>
            </div>
            <button
              onClick={() => handleCopyQuestion(question.q)}
              className={`text-xs font-semibold px-2 py-1 rounded flex-shrink-0 transition ${getPriorityColor(question.priority)}`}
            >
              Copy
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default QuestionsTab
