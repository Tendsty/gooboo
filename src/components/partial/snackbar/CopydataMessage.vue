<template>
  <v-card color="transparent" flat>
    <template v-if="message.error">
      <div>
        <v-icon>mdi-alert</v-icon>
        复制失败
      </div>
      <div>{{ message.error.message }}</div>
    </template>
    <div v-else>复制成功，新建一个txt文件粘贴进去即可用来导入</div>
  </v-card>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>
