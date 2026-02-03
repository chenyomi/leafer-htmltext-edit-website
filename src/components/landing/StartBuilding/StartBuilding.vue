<template>
  <section class="start-building-section">
    <div class="start-building-container">
      <div class="start-building-card relative">
        <Squares
          class="w-full h-full"
          direction="diagonal"
          :speed="0.4"
          :squareSize="40"
          borderColor="#999"
          hoverFillColor="#222"
          style="position: absolute; left: 0; top: 0"
        />
        <h2 class="start-building-title">Video</h2>
        <p class="start-building-subtitle">操作简介</p>
        <video src="@/assets/video/video.mov" controls class="w-200"></video>
        <router-link custom to="" class="start-building-button">
          <a href="https://chenyomi.github.io/leafer-htmltext-edit-view/" target="_blank">Just Trying Now</a>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import './StartBuilding.css';
import Squares from '@/content/Backgrounds/Squares/Squares.vue';
</script>
