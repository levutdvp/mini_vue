<template>
  <el-row>
    <el-col :span="20">
      <el-form label-width="auto">
        <el-form-item class="form-item" label="Keyword" prop="keyword">
          <el-input v-model="search" @input="validateKeyword" />
          <span class="danger" v-if="!isKeywordValid"
            >Keyword is required and cannot contain special characters.</span
          >
        </el-form-item>
        <el-form-item class="form-item" label="Username">
          <el-col :span="9">
            <el-input v-model="username" />
          </el-col>
          <el-col :span="2"> </el-col>
          <el-col :span="13">
            <el-form-item class="form-item" label="Date of birth">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
                v-model="dateOfBirth"
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
            <el-input v-model="creditCard" />
          </el-col>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="4">
      <div class="mb-2">
        <el-button type="primary" :icon="Search" @click="handleSearch"
          >Search</el-button
        >
      </div>
      <div>
        <el-button type="warning" @click="search = ''">Reset</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { TOption } from "../../types/common";

interface positionOptions {
  value: string;
  label: string;
}

const username = ref("");
const dateOfBirth = ref(null);
const creditCard = ref("");
const positionOptions = ref<positionOptions[]>([]);
const statusOptions = ref<TOption[]>([
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


const emit = defineEmits(["onSearch"]);

const isKeywordValid = ref(true);
const search = ref('')
const validateKeyword = () => {
  const regex = /^[a-zA-Z0-9_ ]*$/;
  isKeywordValid.value =regex.test(search.value.trim());
};


const formSearch = reactive({
  keyword: '',
  username: '',
  date_of_birth: '',
  position: [],
  phone_number: '',
  cc_number: '',
  email: '',
  status: []
});

const handleSearch = () => {
  if(!isKeywordValid.value) return
  formSearch.keyword = search.value
  formSearch.username = search.value
  formSearch.phone_number = search.value
  emit("onSearch", formSearch);
};



</script>
<style scoped>
.mb-2 {
  margin-bottom: 0.5rem !important;
}
.danger {
  color: red;
}
</style>