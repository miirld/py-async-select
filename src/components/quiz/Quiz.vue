<script setup lang="ts">
import { ref } from 'vue'
import { questions } from '@/data/questions'
import QuizStart from '@/components/quiz/QuizStart.vue'
import QuizStep from '@/components/quiz/QuizStep.vue'
import QuizResult from '@/components/quiz/QuizResult.vue'

const step = ref<'start' | 'quiz' | 'result'>('start')
const currentQuestionIndex = ref(0)
const answers = ref<Partial<Record<number, string>>>({})

const startQuiz = () => {
  step.value = 'quiz'
}

const nextStep = () => {
  if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++
  } else {
    step.value = 'result'
  }
}

const prevStep = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--
  }
}

const restart = () => {
  step.value = 'start'
  currentQuestionIndex.value = 0
  answers.value = {}
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-4xl">
      <QuizStart v-if="step === 'start'" @start="startQuiz" />

      <QuizStep
        v-else-if="step === 'quiz'"
        :question="questions[currentQuestionIndex]!"
        :current-value="answers[currentQuestionIndex]"
        :is-first="currentQuestionIndex === 0"
        :is-last="currentQuestionIndex === questions.length - 1"
        :current-index="currentQuestionIndex + 1"
        :total-count="questions.length"
        @update:modelValue="(v) => (answers[currentQuestionIndex] = v)"
        @next="nextStep"
        @prev="prevStep"
      />

      <QuizResult v-else-if="step === 'result'" :answers="answers" @restart="restart" />
    </div>
  </div>
</template>
