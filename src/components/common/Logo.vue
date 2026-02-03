<template>
  <TextType
    :text="['Hey, I\'m Yoomi.', 'A solo developer making cool stuff.']"
    :typingSpeed="75"
    :pauseDuration="1500"
    :showCursor="true"
    cursorCharacter="|"
  />
</template>

<script setup lang="ts">
import TextType from '@/content/TextAnimations/TextType/TextType.vue';
</script>
