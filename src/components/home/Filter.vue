<template>
  <el-row>
    <el-col :span="20">
      <el-form label-width="auto">
        <el-form-item class="form-item" label="Keyword">
          <el-input />
        </el-form-item>

        <el-form-item class="form-item" label="Username">
          <el-col :span="9">
            <el-input />
          </el-col>
          <el-col :span="2"> </el-col>
          <el-col :span="13">
            <el-form-item class="form-item" label="Date of birth">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item class="form-item" label="Position">
          <el-col :span="9">
            <el-select placeholder="Please select position">
              <el-option
                v-for="item in positionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="2"> </el-col>
          <el-col :span="13">
            <el-form-item class="form-item" label="Status">
              <el-select placeholder="Please select status">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item class="form-item" label="Credit card">
          <el-col :span="9">
            <el-input />
          </el-col>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="4">
      <div class="mb-2">
        <el-button type="primary" :icon="Search">Search</el-button>
      </div>
      <div>
        <el-button type="warning">Reset</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Search} from '@element-plus/icons-vue'

const positionOptions = ref([
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
  {
    value: "Option6",
    label: "Option6",
  },
]);
const statusOptions = ref([
  {
    value: "Blocked",
    label: "Blocked",
  },
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Pending",
    label: "Pending",
  },
]);
</script>
<style scoped>
.mb-2 {
  margin-bottom: 0.5rem !important;
}
</style>