<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, CheckCircle2 } from 'lucide-vue-next'
import type { FrameworkResult } from '@/types'

defineProps<{
  result: FrameworkResult
  total: number
  isWinner?: boolean
}>()
</script>

<template>
  <Card class="relative">
    <div class="absolute top-6 right-6">
      <component :is="isWinner ? CheckCircle2 : AlertCircle" class="w-12 h-12 opacity-20" />
    </div>
    <CardHeader>
      <CardTitle class="text-2xl">
        {{ result.name }}
      </CardTitle>
      <CardDescription>Соответствие: {{ result.score }} / {{ total }}</CardDescription>
    </CardHeader>

    <CardContent class="space-y-5">
      <div v-if="result.match.length" class="flex flex-col gap-2">
        <h4 class="flex items-center gap-2 text-sm text-green-700">
          <CheckCircle2 class="h-4 w-4" />
          Соответствует
        </h4>
        <div class="flex flex-wrap gap-2">
          <Badge v-for="item in result.match" :key="item" class="bg-green-100 text-green-600">
            {{ item }}
          </Badge>
        </div>
      </div>

      <Separator v-if="result.miss.length && result.match.length" />

      <div v-if="result.miss.length" class="flex flex-col gap-2">
        <h4 class="flex items-center gap-2 text-sm text-red-700">
          <AlertCircle class="h-4 w-4" />
          Не соответствует
        </h4>
        <div class="flex flex-wrap gap-2">
          <Badge v-for="item in result.miss" :key="item" class="bg-red-100 text-red-600">
            {{ item }}
          </Badge>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
