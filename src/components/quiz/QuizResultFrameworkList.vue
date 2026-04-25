<script setup lang="ts">
import { ref, computed } from 'vue'
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import QuizResultFramework from '@/components/quiz/QuizResultFramework.vue'
import type { FrameworkResult } from '@/types'

const props = defineProps<{
  results: FrameworkResult[]
  total: number
}>()

const showOthers = ref(false)

const winners = computed(() => {
  if (props.results.length === 0) return []
  const max = Math.max(...props.results.map((r) => r.score))
  if (max === 0) return []
  return props.results.filter((r) => r.score === max)
})

const others = computed(() => {
  const winnerNames = winners.value.map((w) => w.name)
  return props.results.filter((r) => !winnerNames.includes(r.name))
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-2 font-semibold text-xl opacity-70">
      <CheckCircle2 class="w-5 h-5" />
      Лучшее соответствие
    </div>
    <QuizResultFramework
      v-for="fw in winners"
      :key="fw.name"
      :result="fw"
      :total="total"
      :is-winner="true"
    />
    <template v-if="others.length > 0">
      <Button variant="ghost" class="self-center" @click="showOthers = !showOthers">
        <component :is="showOthers ? ChevronUp : ChevronDown" />
        {{ showOthers ? 'Скрыть остальные' : 'Показать остальные' }}
      </Button>
      <template v-if="showOthers">
        <div class="flex items-center gap-2 font-semibold text-xl opacity-70">
          <AlertCircle class="w-5 h-5" />
          Остальные фреймворки
        </div>
        <QuizResultFramework v-for="fw in others" :key="fw.name" :result="fw" :total="total" />
      </template>
    </template>
  </div>
</template>
