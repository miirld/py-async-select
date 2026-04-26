<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { questions, FRAMEWORKS } from '@/data/questions'

defineEmits(['start'])

const frameworksList = computed(() => FRAMEWORKS.join(', '))
</script>

<template>
  <Card class="max-w-3xl mx-auto">
    <CardHeader>
      <CardTitle class="text-3xl tracking-tight">
        Система рекомендаций для подбора асинхронного Python-фреймворка
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-4 text-lg text-foreground/80">
      <p>
        Рекомендательная система основана на&nbsp;ряде критериев. В&nbsp;рамках каждого критерия Вам
        будет предложено сделать выбор одного из&nbsp;вариантов, отражающих возможные требования
        к&nbsp;фреймворку.
      </p>
      <p>
        Выберите вариант, который наиболее точно подходит под Ваши требования. Если сомневаетесь,
        выберите вариант &laquo;Затрудняюсь ответить&raquo;.
      </p>
      <p>
        По&nbsp;результатам опроса Вам будет рекомендован один или несколько фреймворков
        в&nbsp;соответствии с&nbsp;Вашими ответами.
      </p>

      <p>
        Ознакомиться с&nbsp;матрицей рекомендаций можно по&nbsp;<span class="text-nowrap"
          ><RouterLink to="/rec-table" class="underline underline-offset-4"
            >ссылке</RouterLink
          ></span
        >
      </p>

      <Separator />

      <p><span class="font-medium">Рассматриваемые фреймворки: </span>{{ frameworksList }}</p>

      <div class="space-y-2">
        <p class="font-medium">Рассматриваемые критерии:</p>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside marker:text-primary">
          <li v-for="(q, index) in questions" :key="index" class="text-base">
            {{ q.criterion }}
          </li>
        </ul>
      </div>
    </CardContent>
    <CardFooter>
      <Button size="lg" class="w-full text-base" @click="$emit('start')">Начать опрос</Button>
    </CardFooter>
  </Card>
</template>
