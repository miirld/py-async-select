<script setup lang="ts">
import { computed, ref } from 'vue'
import { questions, FRAMEWORKS } from '@/data/questions'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import AnswerList from '@/components/quiz/QuizResultAnswerList.vue'
import FrameworkList from '@/components/quiz/QuizResultFrameworkList.vue'
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty'

const props = defineProps<{
  answers: Partial<Record<number, string>>
}>()

const emit = defineEmits<{
  restart: []
}>()

const activeView = ref<'results' | 'summary'>('results')

const toggleView = () => {
  activeView.value = activeView.value === 'results' ? 'summary' : 'results'
}

const results = computed(() => {
  return FRAMEWORKS.map((name) => {
    const match: string[] = []
    const miss: string[] = []

    questions.forEach((q, qIdx) => {
      const rawAnswer = props.answers[qIdx]
      if (rawAnswer === undefined) return

      const option = q.options[Number(rawAnswer)]
      if (!option || option.isNeutral) return

      if (option.frameworks.includes(name)) {
        match.push(q.criterion)
      } else {
        miss.push(q.criterion)
      }
    })

    return {
      name,
      match,
      miss,
      score: match.length,
    }
  }).sort((a, b) => b.score - a.score)
})

const isRated = computed(() => results.value.some((r) => r.score > 0))
</script>

<template>
  <Card class="max-w-3xl mx-auto">
    <CardHeader class="justify-center">
      <CardTitle class="text-3xl tracking-tight">
        {{ activeView === 'results' ? 'Анализ результатов' : 'Обзор ответов' }}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <div v-if="activeView === 'results'">
        <FrameworkList v-if="isRated" :results="results" :total="questions.length" />
        <Empty v-else>
          <EmptyHeader>
            <EmptyTitle>Нет результатов</EmptyTitle>
            <EmptyDescription>
              Такое возможно, если в&nbsp;рамках каждого критерия был выбран вариант
              &laquo;Затрудняюсь ответить&raquo;
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" @click="activeView = 'summary'">Проверить ответы</Button>
          </EmptyContent>
        </Empty>
      </div>
      <AnswerList v-else :answers="answers" />
    </CardContent>

    <CardFooter class="gap-4 flex-wrap">
      <Button variant="outline" size="lg" class="flex-1 text-base" @click="toggleView">
        {{ activeView === 'results' ? 'Ваши ответы' : 'К результатам' }}
      </Button>
      <Button size="lg" class="flex-1 text-base" @click="emit('restart')">Пройти заново</Button>
    </CardFooter>
  </Card>
</template>
