export interface Option {
  label: string
  text: string
  frameworks: string[]
  isNeutral?: boolean
}

export interface Question {
  criterion: string
  description: string
  options: Option[]
}

export interface FrameworkResult {
  name: string
  match: string[]
  miss: string[]
  score: number
}
