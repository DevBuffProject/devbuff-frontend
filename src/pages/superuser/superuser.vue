<template>
  <div class="flex">
    <RouterLink to="/su/approve" custom v-slot="{ navigate }">
      <AtomicCard @click="navigate">
        <div class="flex items-center">
          <ShieldIcon
            class="text-gradient-laguna text-2xl"
            name="outline/shield-check"
          />
          <span class="ml-4 text-2xl">Модерация</span>
        </div>
      </AtomicCard>
    </RouterLink>
    <RouterLink to="/su/skillManager" custom v-slot="{ navigate }">
      <AtomicCard @click="navigate">
        <div class="flex items-center">
          <ShieldIcon
            class="text-gradient-laguna text-2xl"
            name="outline/shield-check"
          />
          <span class="ml-4 text-2xl">Skill manager</span>
        </div>
      </AtomicCard>
    </RouterLink>
  </div>
</template>
